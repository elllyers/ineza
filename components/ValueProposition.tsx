"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
export default function ValueProposition() {
  return (
    <section className="min-h-screen  py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              Transforming Digital Services in Rwanda
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-xl text-slate-400"
            >
              From seamless banking to instant document services, we&apos;re
              making digital transformation accessible to everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full"
              >
                Get Started Now
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Video (hidden on mobile, replaced with alternative content) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative h-[600px] w-full rounded-2xl overflow-hidden hidden items-center justify-center bg-black md:flex"
          >
            <video
              src="/inezacube.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full rounded-2xl"
              style={{ minHeight: "100%", minWidth: "100%" }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent pointer-events-none" />
          </motion.div>
          {/* Alternative content for mobile */}
          <div className="flex md:hidden items-center justify-center h-48 w-full bg-slate-900 rounded-2xl text-slate-300 text-center text-lg font-medium">
            Experience digital transformation on any device.
          </div>
        </div>
      </div>
    </section>
  );
}
