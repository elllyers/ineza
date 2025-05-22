"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Gem } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    price: {
      monthly: 29,
      annual: 290,
    },
    description: "Essential tools for getting started",
    features: [
      "Basic Banking Services",
      "Standard Irembo Processing",
      "Simple Digital Invitations",
      "Basic Stationery Templates",
      "Email Support (48h response)",
    ],
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-900/10",
  },
  {
    name: "Professional",
    icon: <Shield className="w-5 h-5 text-purple-400" />,
    price: {
      monthly: 99,
      annual: 990,
    },
    description: "For growing businesses with more needs",
    features: [
      "Advanced Banking Features",
      "Priority Irembo Processing",
      "Premium Invitation Designs",
      "Custom Stationery Options",
      "24/7 Priority Support",
      "Secure Payment Gateway",
      "Multi-user Access (3 seats)",
    ],
    recommended: true,
    borderColor: "border-purple-500/30",
    bgColor: "bg-gradient-to-b from-purple-900/20 to-purple-900/10",
  },
  {
    name: "Enterprise",
    icon: <Gem className="w-5 h-5 text-emerald-400" />,
    price: {
      monthly: 199,
      annual: 1990,
    },
    description: "Complete solutions for large organizations",
    features: [
      "VIP Banking Services",
      "Instant Irembo Processing",
      "White-label Invitations",
      "Unlimited Custom Designs",
      "Dedicated Account Manager",
      "API Integration",
      "Advanced Analytics Dashboard",
      "99.9% Uptime SLA",
    ],
    borderColor: "border-emerald-500/30",
    bgColor: "bg-gradient-to-b from-emerald-900/20 to-gray-900/10",
  },
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/4 to-gray-950/4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold  mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Tailored Pricing Plans
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Choose the perfect plan that scales with your business needs
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-800 rounded-full p-1 mb-2">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                !isAnnual
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isAnnual
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Annual <span className="text-green-400 ml-1">(Save 20%)</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={plan.recommended ? { y: -10 } : {}}
            >
              <Card
                className={`relative h-full border-2 transition-all duration-300 overflow-hidden 
                  ${plan.borderColor} ${plan.bgColor}
                  ${plan.recommended ? "shadow-lg shadow-purple-500/20" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-20"></div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3">
                    {plan.icon}
                    <CardTitle className="text-2xl font-bold text-white">
                      {plan.name}
                    </CardTitle>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <motion.p
                      className="text-5xl font-bold text-white"
                      key={isAnnual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                      <span className="text-lg text-gray-400 font-normal">
                        /{isAnnual ? "year" : "mo"}
                      </span>
                    </motion.p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full py-6 text-lg font-semibold mt-4
                        ${
                          plan.recommended
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/30"
                            : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                        }`}
                    >
                      Start with {plan.name}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          Need custom solutions?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Contact our sales team
          </a>
        </div>
      </div>
    </section>
  );
}
