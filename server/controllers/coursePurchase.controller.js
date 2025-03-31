import Stripe from "stripe";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Create a new course purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/course-progress/${courseId}`,
      cancel_url: `${process.env.CLIENT_URL}/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Session creation failed" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Error in checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log("Payment Successful - Processing Enrollment");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase)
        return res.status(404).json({ message: "Purchase not found" });

      purchase.status = "completed";
      await purchase.save();

      // Unlock Lectures
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      // Update User Enrollment
      const user = await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      // Update Course Enrollment
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      // Send Confirmation Email
      if (user) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Course Purchase Confirmation",
          html: `
          <h2>Congratulations! 🎉</h2>
          <p>You have successfully purchased the course <strong>${purchase.courseId.courseTitle}</strong>.</p>
          <img src="${purchase.courseId.courseThumbnail}" alt="Course Thumbnail" style="width: 300px; border-radius: 10px;">
          <p><strong>Price:</strong> ₹${purchase.amount}</p>
          <p>Thank you for learning with us!</p>
        `,
        });
        console.log("Email sent to", user.email);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};

// Get Course Details with Purchase Status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) return res.status(404).json({ message: "Course not found!" });

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Purchased Courses
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourses: purchasedCourses || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
