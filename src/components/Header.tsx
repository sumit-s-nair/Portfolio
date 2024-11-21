"use client";

import { useState, useEffect } from "react";
import { FaHome, FaUser, FaBriefcase, FaImages } from "react-icons/fa";

const Header = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [currentTime, setCurrentTime] = useState("");

  const navItems = [
    { label: "Home", href: "/", icon: <FaHome /> },
    { label: "About", href: "/about", icon: <FaUser /> },
    { label: "Work", href: "/work", icon: <FaBriefcase /> },
    { label: "Gallery", href: "/gallery", icon: <FaImages /> },
  ];

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50 dark:bg-black/50 shadow-md rounded-lg mx-auto max-w-7xl w-full mt-6">
      <div className="hidden lg:flex items-center justify-between px-6 py-4 mx-auto w-full">
        {/* Location & Time for Desktop */}
        <div className="text-sm text-gray-700 dark:text-gray-300 hidden lg:block">
          Bengaluru, Karnataka
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                activeLink === item.href
                  ? "border border-red-900 text-white dark:hover:bg-gray-800"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Current Time for Desktop */}
        <div className="text-sm text-gray-700 dark:text-gray-300 hidden lg:block">
          {currentTime}
        </div>
      </div>

      {/* Mobile Navbar (Bottom) */}
      <nav className="lg:hidden space-x-8 rounded-t-lg flex justify-between items-center px-4 py-4 mx-4">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setActiveLink(item.href)}
            className={`flex flex-col items-center justify-center space-y-1 p-2 rounded-full text-sm font-medium ${
              activeLink === item.href
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {/* Hide text on mobile */}
            <span className="hidden lg:block">{item.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
