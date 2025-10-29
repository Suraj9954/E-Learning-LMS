# 🎓 E-Learning Platform (MERN Stack)

## 📖 Overview
A **full-stack E-Learning web application** built using the **MERN stack** that allows students to enroll in courses, track their progress, and make secure online payments. Instructors can create and manage courses, view analytics, and monitor revenue — all within an intuitive dashboard.

This project demonstrates production-grade **authentication, payment integration, state management**, and **data visualization** using modern web technologies.

---

## 🚀 Live Demo & Repository
🔗 **Live Demo:** (https://deployed-lms.vercel.app/)  
💻 **GitHub Repository:** (https://github.com/Suraj9954/E-Learning-LMS)

---

## 🧠 Key Features

### 👨‍🏫 For Instructors
- Create, edit, and manage courses with a **rich text editor (React Quill)**  
- Track revenue and student engagement using **data visualizations (Recharts)**  
- Monitor course performance and update content dynamically  

### 👩‍🎓 For Students
- Browse, purchase, and access courses securely  
- Automatic **progress tracking** for completed lectures and courses  
- Interactive course player with comment support (if you plan to add it)

### 🔐 Authentication & Security
- **JWT-based Authentication** with refresh tokens  
- **Role-Based Access Control (RBAC)** for Admin, Instructor, and Student roles  
- Secure **API protection** using middleware in Express  

### 💳 Payment System
- **Stripe Payment Gateway Integration** for secure and real-time transactions  
- **Nodemailer** for automated emails (payment confirmations, password resets)  

### ⚙️ Performance & Optimization
- Optimized global state management with **Redux Toolkit (RTK Query)**  
- Efficient data fetching and caching  
- Scalable RESTful APIs following clean architectural patterns  

---

## 🧰 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React.js, Redux Toolkit (RTK Query), React Router, React Quill, Recharts |
| **Backend** | Node.js, Express.js, JWT, bcrypt, Nodemailer |
| **Database** | MongoDB (Mongoose ODM) |
| **Payment** | Stripe API |
| **Deployment** | Render & Vercel |

---

