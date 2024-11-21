"use client";

import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-md rounded-t-lg m-6 px-6 py-4">
      <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/sumit-santhosh-nair-3ba522283/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/sumit-s-nair"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/_sumit.nair_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-500"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          &copy; {currentYear} Sumit Santhosh Nair. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
