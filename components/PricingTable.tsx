"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: {
      monthly: 29,
      annual: 290,
    },
    description: "Perfect for small businesses just getting started",
    features: [
      "Basic Banking Services",
      "Standard Irembo Services",
      "Simple Digital Invitations",
      "Basic Stationery Design",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    price: {
      monthly: 99,
      annual: 990,
    },
    description: "Best value for growing businesses",
    features: [
      "Advanced Banking Services",
      "Priority Irembo Processing",
      "Premium Digital Invitations",
      "Custom Stationery Design",
      "24/7 Priority Support",
      "Secure Payment Gateway",
      "Multi-user Access",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: {
      monthly: 199,
      annual: 1990,
    },
    description: "For large organizations with complex needs",
    features: [
      "Enterprise Banking Solutions",
      "VIP Irembo Services",
      "White-label Invitations",
      "Unlimited Stationery Design",
      "Dedicated Account Manager",
      "Custom API Integration",
      "Advanced Analytics",
      "SLA Guarantees",
    ],
  },
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs. All plans include
            our core services with different levels of features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm ${
                !isAnnual ? "text-white" : "text-slate-400"
              }`}
            >
              Monthly
            </span>
            <motion.button
              className="relative w-16 h-8 rounded-full bg-slate-700 p-1 cursor-pointer"
              onClick={() => setIsAnnual(!isAnnual)}
              initial={false}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-blue-500"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span
              className={`text-sm ${
                isAnnual ? "text-white" : "text-slate-400"
              }`}
            >
              Annual
              <span className="ml-1 text-green-400">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`relative h-full backdrop-blur-lg border transition-colors duration-300
                  ${
                    plan.recommended
                      ? "bg-blue-900/20 border-blue-500 shadow-lg shadow-blue-500/20"
                      : "bg-white/5 border-slate-800/50 hover:bg-white/10"
                  }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <motion.p
                      className="text-4xl font-bold text-white"
                      key={isAnnual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                      <span className="text-lg text-slate-400 font-normal">
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </motion.p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-slate-300"
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
                      className={`w-full py-6 text-lg
                        ${
                          plan.recommended
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
