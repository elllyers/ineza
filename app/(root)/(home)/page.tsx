import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ValueProposition from "@/components/ValueProposition";
import FeaturesGrid from "@/components/FeaturesGrid";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import Getready from "@/components/getready";

const page = () => {
  return (
    <div className="min-h-screen w-full">
      {" "}
      <Hero />
      <ValueProposition />
      <FeaturesGrid />
      <HowItWorks />
      <PricingTable />
      <FAQ />
      <Getready />
    </div>
  );
};
export default page;
