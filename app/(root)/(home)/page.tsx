import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ValueProposition from "@/components/ValueProposition";
import FeaturesGrid from "@/components/FeaturesGrid";
import Testimonials from "@/components/Testimonials";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

const page = () => {
  return (
    <div className="min-h-screen w-full">
      {" "}
      <Hero />
      <ValueProposition />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <PricingTable />
      <FAQ />
      <FinalCTA />
    </div>
  );
};
export default page;
