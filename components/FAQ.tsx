"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does Ineza offer?",
    answer:
      "Ineza provides a comprehensive suite of digital services including banking agent services, Irembo government services processing, digital invitations, and business stationery design. We focus on making digital transformation accessible to everyone in Rwanda.",
  },
  {
    question: "How do I access banking services through Ineza?",
    answer:
      "You can access our banking services through our secure mobile platform or visit any of our authorized agent locations. Our platform allows you to perform transactions, check balances, and manage your accounts 24/7.",
  },
  {
    question: "What Irembo services can I process through Ineza?",
    answer:
      "Through Ineza, you can process various Irembo services including document applications, permits, and certifications. Our platform streamlines the process, making government services more accessible and efficient.",
  },
  {
    question: "How secure are the transactions on your platform?",
    answer:
      "We implement bank-grade security measures including end-to-end encryption, secure payment processing, and multi-factor authentication. All transactions are monitored 24/7 to ensure the safety of your data and funds.",
  },
  {
    question: "Can I create custom digital invitations?",
    answer:
      "Yes! Our digital invitation service allows you to create beautiful, customized invitations for any occasion. You can choose from various templates, add your own images, and share them instantly with your guests.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 customer support through multiple channels including phone, email, and live chat. Our dedicated support team is always ready to assist you with any queries or issues you may have.",
  },
  {
    question: "How do I get started with Ineza?",
    answer:
      "Getting started is easy! Simply sign up for an account on our platform, verify your identity, and you'll have immediate access to our basic services. For business accounts, our team will guide you through the setup process.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function FAQ() {
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
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about our services and platform
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white/5 backdrop-blur-lg rounded-lg px-6 data-[state=open]:bg-white/10"
                >
                  <AccordionTrigger className="text-white hover:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-400">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
