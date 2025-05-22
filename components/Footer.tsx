"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Services", href: "/services" },
      { name: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
    ],
  },
];

export default function Footer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send this to your API
    console.log(values);
  }

  return (
    <footer className="relative mt-16 bg-gradient-to-b from-slate-950 to-black-1 text-slate-300">
      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-950" />

      <div className="container relative mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo and Newsletter Section */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center">
              <Image
                width={32}
                height={32}
                src="/logo-with-text.svg"
                alt="Ineza"
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="max-w-md space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                Join our newsletter to stay up to date on features and releases.
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="bg-slate-900/50 border-slate-800 h-12 text-white placeholder:text-slate-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                  >
                    Subscribe
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col space-y-4">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-slate-900/50 p-2 rounded-full hover:bg-slate-800 transition-all duration-200"
                  >
                    <social.icon className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-slate-800/50" />

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Ineza. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <Link
              href="/terms"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <Link
              href="/cookies"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
