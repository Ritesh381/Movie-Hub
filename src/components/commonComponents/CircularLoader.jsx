import React, { useEffect, useState } from "react";

const CircularLoader = ({
  progress = 0,
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
  text = "Loading...",
  className = ""
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer Glow Ring */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `conic-gradient(from 0deg, 
              rgba(147, 51, 234, 0.3), 
              rgba(236, 72, 153, 0.3), 
              rgba(59, 130, 246, 0.3), 
              rgba(16, 185, 129, 0.3), 
              rgba(147, 51, 234, 0.3))`,
            width: size + 20,
            height: size + 20,
            left: -10,
            top: -10,
            filter: 'blur(8px)'
          }}
        />

        {/* Main SVG Circle */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 relative z-10"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Animated Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="25%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercentage && (
            <span className="text-2xl md:text-3xl font-bold text-gradient-purple-blue">
              {Math.round(animatedProgress)}%
            </span>
          )}
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce mt-1" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-4 text-center">
        <p className="text-gradient-pink-purple font-semibold text-lg">
          {text}
        </p>
        <div className="flex space-x-1 justify-center mt-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

// Full Screen Loading Overlay Component
export const FullScreenLoader = ({
  progress = 0,
  text = "Loading awesome content...",
  subText = "Please wait while we fetch the latest movies"
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-primary bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-effect rounded-2xl p-8 max-w-sm w-full mx-4 text-center glow-purple">
        <CircularLoader
          progress={progress}
          size={150}
          text={text}
          className="mb-4"
        />
        <p className="text-gray-400 text-sm mt-4">
          {subText}
        </p>
      </div>
    </div>
  );
};

// Mini Loader for smaller components
export const MiniLoader = ({ size = 40, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: `conic-gradient(from 0deg, 
              transparent, 
              rgba(147, 51, 234, 0.8), 
              rgba(236, 72, 153, 0.8), 
              transparent)`,
          }}
        />
        <div
          className="absolute inset-1 rounded-full bg-gray-900"
        />
      </div>
    </div>
  );
};

export default CircularLoader; 