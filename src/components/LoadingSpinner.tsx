import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div>
      <div className={`flex items-center justify-center ${className}`}>
        <div
          className={`animate-spin rounded-full border-2 border-gray-300 border-t-white ${sizeClasses[size]}`}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
