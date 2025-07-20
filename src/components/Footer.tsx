"use client";

import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { socialLinks, siteConfig } = usePortfolioData();

  return (
    <footer className="bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-md rounded-t-lg m-6 px-6 py-4">
      <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
        {/* Social Links */}
        <div className="flex space-x-6">
          {socialLinks?.linkedin && (
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500"
            >
              <FaLinkedin />
            </Link>
          )}
          {socialLinks?.github && (
            <Link
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              <FaGithub />
            </Link>
          )}
          {socialLinks?.instagram && (
            <Link
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-500"
            >
              <FaInstagram />
            </Link>
          )}
          {socialLinks?.email && (
            <Link
              href={`mailto:${socialLinks.email}`}
              className="text-lg text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500"
            >
              <FaEnvelope />
            </Link>
          )}
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          &copy; {currentYear} {siteConfig?.siteName || "Sumit Santhosh Nair"}.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
