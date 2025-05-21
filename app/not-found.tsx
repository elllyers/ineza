"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  // Floating animation for the error code
  const float = {
    hidden: { y: 0 },
    visible: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }; // Initial static star positions
  type Star = {
    id: number;
    x: number;
    y: number;
    size?: number;
    duration?: number;
    delay?: number;
  };

  const staticStars: Star[] = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    // Use consistent values based on the index
    x: (i * 17) % 100, // This creates a distributed pattern
    y: (i * 23) % 100, // Using prime numbers helps distribute evenly
  }));

  // Animation values on client side only
  const [animatedStars, setAnimatedStars] = useState<Star[]>(staticStars);

  useEffect(() => {
    // Add animation values only on the client side
    const newStars = staticStars.map((star) => ({
      ...star,
      size: (star.id % 3) + 1, // Size between 1-3 based on id
      duration: 3 + (star.id % 4), // Duration between 3-6s based on id
      delay: (star.id * 0.2) % 2, // Delay between 0-2s based on id
    }));
    setAnimatedStars(newStars);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-4">
      {" "}
      {/* Animated stars background */}{" "}
      {staticStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-50"
          style={{
            width: animatedStars[star.id]?.size || 1,
            height: animatedStars[star.id]?.size || 1,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
            y: star.id % 2 === 0 ? [0, -15, 0] : [-10, 5, -10], // Alternate movement patterns
            x: star.id % 3 === 0 ? [-5, 5, -5] : [0, 10, 0], // Some stars move diagonally
          }}
          transition={{
            duration: animatedStars[star.id]?.duration || 3,
            delay: animatedStars[star.id]?.delay || 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={float}
          className="flex items-center justify-center space-x-4"
        >
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            404
          </div>
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Rocket className="w-16 h-16 md:w-20 md:h-20 text-blue-400" />
          </motion.div>
        </motion.div>

        <div className="space-y-4 max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Houston, We Have a Problem!
          </h1>
          <p className="text-slate-300 text-lg">
            The page you're looking for has drifted into deep space. Let's get
            you back to familiar territory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 space-x-2"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Return Home</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="border-slate-700 text-slate-300 space-x-2 hover:bg-white/0 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 -right-32 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
}
