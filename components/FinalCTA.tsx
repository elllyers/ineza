"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Activity, Timer, PhoneCall } from "lucide-react";
import { AnimatedStats } from "@/components/AnimatedStats";

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-20, 0, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const glowAnimation = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function FinalCTA() {
  const stats = [
    {
      value: 50000,
      suffix: "+",
      title: "Active Users",
      icon: "Users" as const,
      animationConfig: {
        stiffness: 80,
        damping: 15,
        duration: 2,
      },
    },
    {
      value: 100000,
      suffix: "+",
      title: "Transactions",
      icon: "Activity" as const,
      animationConfig: {
        stiffness: 90,
        damping: 12,
        duration: 2,
      },
    },
    {
      value: 99.9,
      suffix: "%",
      title: "Uptime",
      icon: "Timer" as const,
      decimalPlaces: 1,
      animationConfig: {
        stiffness: 120,
        damping: 8,
        duration: 1.5,
      },
    },
    {
      value: 24,
      suffix: "/7",
      title: "Support",
      icon: "PhoneCall" as const,
      animationConfig: {
        stiffness: 150,
        damping: 10,
        duration: 1,
      },
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />

      {/* Floating Elements */}
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"
      />
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl"
      />
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-40 right-1/4 w-16 h-16 rounded-full bg-pink-500/10 blur-xl"
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Digital Experience?
            </h2>
            <p className="text-lg text-slate-300">
              Join thousands of satisfied customers who have already made the
              switch to Ineza's digital services.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              variants={pulseAnimation}
              initial="initial"
              animate="animate"
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-full shadow-xl shadow-blue-500/20"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
            >
              Schedule a Demo
            </Button>
          </motion.div>{" "}
          {/* Stats Section */}
          <div className="pt-12">
            <AnimatedStats
              stats={stats}
              staggerDelay={0.2}
              containerClass="gap-8"
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-slate-900" />
    </section>
  );
}
