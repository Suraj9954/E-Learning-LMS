import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing arrow icons

const IntroSlider = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Welcome to Our LMS Platform",
      description: "Empowering tech learning anytime, anywhere.",
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Wide Range of Courses",
      description: "Master programming, AI, and cutting-edge technologies.",
    },
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Interactive Learning Experience",
      description: "Learn coding and tech skills through hands-on projects.",
    },
    {
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Join Our Community",
      description: "Collaborate and grow with tech enthusiasts worldwide.",
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Lifelong Learning Journey",
      description: "Stay ahead in technology with continuous learning.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null); // Ref to store the timer

  // Function to set the auto-slide timer
  const setAutoSlideTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds
  };

  // Function to reset the auto-slide timer
  const resetAutoSlideTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setAutoSlideTimer(); // Set the timer again after manual change
  };

  // Auto-sliding logic
  useEffect(() => {
    setAutoSlideTimer(); // Set the initial auto-slide timer

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Clean up timer on component unmount
      }
    };
  }, []);

  // Function for manual navigation (Next and Previous)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoSlideTimer(); // Reset timer when the slide changes
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    resetAutoSlideTimer(); // Reset timer when the slide changes
  };

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Slides */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-[500px] relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              resetAutoSlideTimer(); // Reset timer when the dot is clicked
            }}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index
                ? "bg-white"
                : "bg-gray-400 hover:bg-white transition"
            }`}
          ></button>
        ))}
      </div>

      {/* Side Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default IntroSlider;
