import FinalCTA from "./FinalCTA";
import Testimonials from "./Testimonials";

const HowItWorks = () => {
  return (
    <div>
      <div className="bg-gray-900/3 text-gray-100 py-16 px-6">
        {/* Business Model Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            How We Operate
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-gray-300">
              Ineza Digital Services provides an integrated platform combining
              banking agent services, government document processing (via
              Irembo), digital invitations, and professional stationery design.
              Our one-stop solution enables individuals and businesses to handle
              financial transactions, submit official paperwork, create event
              invitations, and order corporate materials through a single,
              user-friendly interface.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              Built on a secure cloud infrastructure with blockchain
              verification, our systems ensure military-grade encryption for all
              transactions. AI-powered document processing reduces approval
              times from days to hours, while our decentralized storage network
              guarantees 99.9% uptime and instant access to your records from
              any device.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              We pride ourselves on human-centered support, offering 24/7
              assistance through multiple channels including live chat, phone,
              and in-person at our service centers. Each client receives a
              dedicated account manager who provides personalized guidance
              through every step of our services.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-12 text-white">
            Our Key Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-xl border border-blue-800/30 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Instant Digital Processing
                </h3>
              </div>
              <p className="text-gray-400">
                Submit documents and receive approvals in as little as 2 hours
                with our AI-powered verification systems.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 p-6 rounded-xl border border-green-800/30 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Secure Transactions
                </h3>
              </div>
              <p className="text-gray-400">
                Bank-level encryption and biometric authentication protect all
                your financial and document transactions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 p-6 rounded-xl border border-purple-800/30 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  24/7 Accessibility
                </h3>
              </div>
              <p className="text-gray-400">
                Access services anytime through our mobile app, website, or
                network of physical agent locations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 p-6 rounded-xl border border-amber-800/30 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Government-Compliant
                </h3>
              </div>
              <p className="text-gray-400">
                All services meet national standards and are approved by
                relevant regulatory authorities.
              </p>
            </div>
          </div>
        </section>

        {/* Process Flow Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-12 text-white">
            Our Simple Process
          </h2>
          <div className="relative pl-12 space-y-12">
            <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-primary/30 via-purple-500/20 to-transparent"></div>

            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-12 top-0 bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Account Creation
              </h3>
              <p className="text-gray-400">
                Register in minutes with just your national ID and phone number.
                We verify your identity instantly through government databases.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-12 top-0 bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Service Selection
              </h3>
              <p className="text-gray-400">
                Choose from our menu of services - banking transactions,
                document processing, invitations, or stationery design.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-12 top-0 bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Digital Processing
              </h3>
              <p className="text-gray-400">
                Upload required documents and make payments securely through our
                platform. Our systems process most requests within 2-4 hours.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-12 top-0 bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Delivery & Support
              </h3>
              <p className="text-gray-400">
                Receive completed documents digitally or physically. Our support
                team remains available for any follow-up needs.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <Testimonials />
        </section>

        {/* Metrics Section */}
        <section className="max-w-6xl mx-auto">
          <FinalCTA />
        </section>
      </div>
      ;
    </div>
  );
};
export default HowItWorks;
