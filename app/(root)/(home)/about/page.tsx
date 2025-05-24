// app/about/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Our Story
          </h1>
          <p className="text-xl leading-relaxed text-gray-300 mb-8 max-w-3xl">
            Pioneering digital solutions since 2020, we bridge the gap between
            innovative technology and real-world business needs.
          </p>
        </section>

        {/* Main Content */}
        <div className="space-y-20">
          {/* Origin Story */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-white flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-3"></span>
              Where We Began
            </h2>
            <div className="space-y-5">
              <p className="text-lg leading-relaxed text-gray-300">
                Founded in a small coworking space in San Francisco, our journey
                began with three passionate technologists who believed software
                should be both powerful and accessible.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Our first product, launched in 2021, revolutionized how small
                businesses manage their operations. Today, that same commitment
                to innovation drives everything we do.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-white flex items-center">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-3"></span>
              Our Mission
            </h2>
            <p className="text-2xl leading-normal text-gray-200 mb-6 font-light italic">
              &apos;To empower businesses through intuitive technology that
              adapts to people, not the other way around.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-medium mb-3 text-white">
                  What We Believe
                </h3>
                <p className="text-gray-300">
                  Technology should solve real problems without creating new
                  ones. We design solutions that feel natural to use while
                  delivering exceptional results.
                </p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-medium mb-3 text-white">
                  How We Work
                </h3>
                <p className="text-gray-300">
                  Collaboration is at our core. We partner closely with clients
                  to understand their unique challenges before crafting tailored
                  solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-3xl font-semibold mb-8 text-white">
              Core Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Integrity",
                  desc: "We do what&apos;s right, not what&apos;s easy",
                },
                { title: "Innovation", desc: "Pushing boundaries responsibly" },
                { title: "Empathy", desc: "Designing for real people" },
                { title: "Excellence", desc: "Quality in everything we do" },
              ].map((value, i) => (
                <div
                  key={i}
                  className="bg-gray-900/30 p-5 rounded-lg border border-gray-800/50 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="text-xl font-medium mb-2 text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-8">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-gray-800/50">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Ready to transform your business?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl">
                Whether you&apos;re looking for solutions or talent
                opportunities, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-gray-600 hover:bg-gray-900/50"
                >
                  <Link href="/careers">Join Our Team</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
