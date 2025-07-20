"use client";

import { ReactNode } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface AdminButtonProps {
  onClick: () => void | Promise<void>;
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function AdminButton({
  onClick,
  children,
  variant = "primary",
  disabled = false,
  loading = false,
  className = ""
}: AdminButtonProps) {
  const baseClasses = "px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {loading && <LoadingSpinner size="small" />}
      {children}
    </button>
  );
}
