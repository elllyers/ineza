"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Business Owner",
    image: "/agent.png",
    rating: 5,
    text: "Ineza has transformed how I manage my business documents. The digital services are incredibly efficient!",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    name: "John M.",
    role: "Event Planner",
    image: "/invite.png",
    rating: 5,
    text: "The digital invitation service is simply amazing. It's made event planning so much easier for my clients.",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    name: "Alice R.",
    role: "Retail Manager",
    image: "/stationa.png",
    rating: 5,
    text: "Having banking services at my fingertips has revolutionized how I handle my daily transactions.",
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    name: "David W.",
    role: "Government Official",
    image: "/iremboicon.png",
    rating: 5,
    text: "The Irembo services integration is seamless. It's made government processes much more efficient.",
    color: "from-teal-500/20 to-teal-600/20",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-slate-600"
        }`}
      />
    ))}
  </div>
);

export default function Testimonials() {
  const [activeCards, setActiveCards] = useState<number[]>([0, 1, 2]);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveCards((prev) => {
        const nextCards = prev.map(
          (index) => (index + 1) % testimonials.length
        );
        return nextCards;
      });
    }, 5000); // Increased to 5 seconds for better readability

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied
            customers
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => {
            setIsPaused(true);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsHovered(false);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {activeCards.map((testimonialIndex, i) => {
                const testimonial = testimonials[testimonialIndex];
                return (
                  <motion.div
                    key={`${testimonialIndex}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className={`bg-gradient-to-br ${testimonial.color} backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-white/10`}
                  >
                    <div className="mb-6 relative w-20 h-20 mx-auto">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <StarRating rating={testimonial.rating} />
                    <p className="text-slate-300 text-lg my-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {testimonial.role}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeCards.includes(index) ? "bg-blue-500" : "bg-slate-600"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          {/* Pause Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-4 right-4 text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full"
          >
            {isPaused ? "Paused" : "Auto-rotating"}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
