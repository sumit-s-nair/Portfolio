"use client";

import { ReactNode } from "react";

interface AdminCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function AdminCard({ title, children, className = "" }: AdminCardProps) {
  return (
    <section className={`bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm border border-gray-700/50 ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}
