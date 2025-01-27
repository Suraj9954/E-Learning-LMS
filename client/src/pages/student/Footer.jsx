import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Welcome to our E-Learning LMS platform, designed for lifelong learners and tech enthusiasts. Advance your career with cutting-edge courses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#courses" className="hover:underline">
                  Courses
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@elearning.com</li>
              <li>Phone: +1 123-456-7890</li>
              <li>Address: 123 Tech Street, San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} E-Learning LMS Platform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.988h-2.54v-2.89h2.54v-2.195c0-2.507 1.492-3.89 3.775-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.261c-1.243 0-1.63.774-1.63 1.566v1.862h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-blue-300 transition-colors"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.725 9.865 9.865 0 01-3.127 1.195 4.92 4.92 0 00-8.379 4.482c-4.086-.205-7.702-2.165-10.126-5.144a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.903 4.903 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.946 4.89a4.928 4.928 0 01-2.224.084c.626 1.956 2.444 3.379 4.604 3.419a9.86 9.86 0 01-6.102 2.105c-.395 0-.786-.023-1.17-.068a13.945 13.945 0 007.548 2.212c9.054 0 14-7.496 14-13.986 0-.213-.004-.425-.014-.636A9.936 9.936 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.25 5.25 0 0121.5 7.25v8.5A5.25 5.25 0 0116.25 21h-8.5A5.25 5.25 0 012 16.25v-8.5A5.25 5.25 0 017.25 2h.5zm8.5 1.5h-.5a3.75 3.75 0 00-3.75 3.75v.5h-1.5v-.5A3.75 3.75 0 007.75 3.5h-.5a3.75 3.75 0 00-3.75 3.75v.5H2V7.25A5.25 5.25 0 017.25 2h8.5A5.25 5.25 0 0121 7.25v8.5a5.25 5.25 0 01-5.25 5.25h-.5a3.75 3.75 0 00-3.75-3.75v-.5h1.5v.5A3.75 3.75 0 0016.75 19h.5a3.75 3.75 0 003.75-3.75v-.5h.5v.5A5.25 5.25 0 0116.25 21h-8.5A5.25 5.25 0 012 16.25v-8.5A5.25 5.25 0 017.25 2h.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
