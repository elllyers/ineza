"use client";

import { motion } from "framer-motion";
import {
  BanknoteIcon,
  FileTextIcon,
  MailIcon,
  PencilRulerIcon,
  ShieldCheckIcon,
  Clock3Icon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Banking Agent",
    description:
      "Access banking services anywhere, anytime with our secure mobile banking solutions.",
    icon: BanknoteIcon,
    color: "text-blue-500",
  },
  {
    title: "Irembo Services",
    description:
      "Quick and easy access to government services and document processing.",
    icon: FileTextIcon,
    color: "text-purple-500",
  },
  {
    title: "Digital Invitations",
    description:
      "Create and share beautiful digital invitations for any occasion.",
    icon: MailIcon,
    color: "text-pink-500",
  },
  {
    title: "Business Stationery",
    description:
      "Professional business stationery design and printing services.",
    icon: PencilRulerIcon,
    color: "text-teal-500",
  },
  {
    title: "Secure Transactions",
    description:
      "End-to-end encryption and secure payment processing for all services.",
    icon: ShieldCheckIcon,
    color: "text-green-500",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to assist you with any queries.",
    icon: Clock3Icon,
    color: "text-amber-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesGrid() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover the full range of digital services we offer to make your
            life easier
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="bg-white/5 border-slate-800/50 backdrop-blur-lg hover:bg-white/10 transition-colors">
                <CardHeader>
                  <div
                    className={`${feature.color} w-12 h-12 rounded-lg bg-current/10 p-2.5 mb-4`}
                  >
                    <feature.icon className="w-full h-full" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
