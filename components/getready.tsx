"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MotionButton = motion(Button);

export default function Getready() {
  return (
    <section className="">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          Ready to Transform Your Digital Experience?
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-gray-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of satisfied clients who trust Ineza for their banking,
          documentation, and business needs.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MotionButton
            asChild
            className="bg-white/95 text-gray-900 hover:bg-gray-300 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/signup">Get Started Free</Link>
          </MotionButton>

          <MotionButton
            variant="outline"
            className="text-white hover:text-white border-slate-800/75 hover:bg-slate-950/10  px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/demo">Request Demo</Link>
          </MotionButton>
        </motion.div>

        <motion.p
          className="text-gray-200/80 mt-6 sm:mt-8 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          No credit card required • 7-day free trial • Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
