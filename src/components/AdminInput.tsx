"use client";

import { ChangeEvent } from "react";

interface AdminInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "url" | "textarea";
  required?: boolean;
  rows?: number;
  className?: string;
}

export default function AdminInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  rows = 3,
  className = ""
}: AdminInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const baseClasses = "w-full bg-gray-700/50 rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition-colors";

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
}
