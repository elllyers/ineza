"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jean D.",
    role: "Small Business Owner",
    content:
      "Ineza's banking services saved us countless hours. Processing payroll for our 20 employees now takes minutes instead of days. The mobile app is incredibly intuitive.",
    rating: 5,
    service: "Banking",
    avatarColor: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: 2,
    name: "Alice M.",
    role: "Event Planner",
    content:
      "The digital invitations helped me triple my wedding planning business. Clients love the modern designs and RSVP tracking features.",
    rating: 5,
    service: "Invitations",
    avatarColor: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    name: "Robert K.",
    role: "Government Office",
    content:
      "Processing documents through Irembo used to take weeks. With Ineza's priority service, we now get approvals within 24 hours.",
    rating: 4,
    service: "Irembo",
    avatarColor: "from-green-500/20 to-teal-500/20",
  },
  {
    id: 4,
    name: "Sarah T.",
    role: "Corporate Executive",
    content:
      "Our custom stationery designs perfectly captured our brand identity. The team understood our vision immediately.",
    rating: 5,
    service: "Stationery",
    avatarColor: "from-amber-500/20 to-orange-500/20",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/4 to-gray-950/4">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Trusted by businesses and individuals across Rwanda
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-full bg-gray-800/0 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all hover:border-purple-500/30">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.avatarColor} flex items-center justify-center text-white font-bold`}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">{testimonial.content}</p>
                <span className="text-xs text-purple-400 bg-purple-900/20 px-3 py-1 rounded-full">
                  {testimonial.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
