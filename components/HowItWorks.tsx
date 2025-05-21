"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRotatingServices } from "@/lib/useRotatingServices";

// Add types at the top of the file
interface Service {
  name: string;
  description: string;
}

// Demo components for each service
const BankingDemo: React.FC = () => (
  <motion.div
    className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-lg border border-blue-800/30"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-400">Available Balance</div>
          <div className="text-2xl text-white font-bold">$12,450.00</div>
        </div>
        <div className="bg-blue-500/20 p-3 rounded-full">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>{" "}
      <div className="flex gap-4">
        <motion.button
          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-3 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Money
        </motion.button>
        <motion.button
          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-3 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const IremboDemo: React.FC = () => (
  <motion.div
    className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 p-6 rounded-lg border border-purple-800/30"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          className="bg-purple-500/20 p-3 rounded-full"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            className="w-6 h-6 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </motion.div>
        <div>
          <div className="text-lg text-white font-semibold">
            Certificate Request
          </div>
          <div className="text-gray-400">Quick and easy process</div>
        </div>
      </div>
      <div className="space-y-3">
        <motion.div
          className="bg-purple-500/10 p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm text-gray-400">Document Type</div>
          <div className="text-white">Birth Certificate</div>
        </motion.div>
        <motion.button
          className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-3 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Application
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const InvitationsDemo: React.FC = () => (
  <motion.div
    className="bg-gradient-to-br from-pink-900/20 to-pink-800/10 p-6 rounded-lg border border-pink-800/30"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          className="bg-pink-500/20 p-3 rounded-full"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            className="w-6 h-6 text-pink-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </motion.div>
        <div>
          <div className="text-lg text-white font-semibold">
            Digital Invitations
          </div>
          <div className="text-gray-400">Create & share instantly</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          className="bg-pink-500/10 p-4 rounded-lg flex items-center justify-center aspect-square cursor-pointer"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(236, 72, 153, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-pink-400">Wedding</span>
        </motion.div>
        <motion.div
          className="bg-pink-500/10 p-4 rounded-lg flex items-center justify-center aspect-square cursor-pointer"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(236, 72, 153, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-pink-400">Birthday</span>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const StationeryDemo: React.FC = () => (
  <motion.div
    className="bg-gradient-to-br from-teal-900/20 to-teal-800/10 p-6 rounded-lg border border-teal-800/30"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          className="bg-teal-500/20 p-3 rounded-full"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            className="w-6 h-6 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </motion.div>
        <div>
          <div className="text-lg text-white font-semibold">
            Business Stationery
          </div>
          <div className="text-gray-400">Professional designs</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          className="bg-teal-500/10 p-4 rounded-lg flex items-center justify-center aspect-square cursor-pointer"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(20, 184, 166, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-teal-400">Business Cards</span>
        </motion.div>
        <motion.div
          className="bg-teal-500/10 p-4 rounded-lg flex items-center justify-center aspect-square cursor-pointer"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(20, 184, 166, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-teal-400">Letterheads</span>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const demoComponents: Record<string, React.FC> = {
  "Banking Agent": BankingDemo,
  "Irembo Services": IremboDemo,
  Invitations: InvitationsDemo,
  Stationery: StationeryDemo,
};

export default function HowItWorks() {
  const { currentService, allServices } = useRotatingServices();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right"
  >("left");

  // Set loaded state after component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            How Ineza Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our suite of services by interacting with the orb. Drag to
            rotate and click on services to learn more about what we offer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-6">
              <AnimatePresence mode="wait" custom={transitionDirection}>
                {activeService ? (
                  <motion.div
                    key={activeService}
                    custom={transitionDirection}
                    initial={{
                      opacity: 0,
                      x: transitionDirection === "left" ? 50 : -50,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: transitionDirection === "left" ? -50 : 50,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                    className="text-white"
                  >
                    <motion.h3
                      className="text-2xl font-bold mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeService}
                    </motion.h3>
                    <motion.div
                      className="service-demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {demoComponents[
                        activeService as keyof typeof demoComponents
                      ] &&
                        React.createElement(
                          demoComponents[
                            activeService as keyof typeof demoComponents
                          ]
                        )}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-slate-400"
                  >
                    <motion.p
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Select a service from the orb to see a live demo and learn
                      more about its features.
                    </motion.p>
                    <motion.ul
                      className="list-none space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {allServices.map((service, index) => (
                        <motion.li
                          key={service.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              service.name === "Banking Agent"
                                ? "bg-blue-400"
                                : service.name === "Irembo Services"
                                ? "bg-purple-400"
                                : service.name === "Invitations"
                                ? "bg-pink-400"
                                : "bg-teal-400"
                            }`}
                          />
                          {service.name}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
