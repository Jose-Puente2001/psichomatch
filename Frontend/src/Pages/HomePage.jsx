import Hero from "../Components/HomePage/Hero";
import { FeaturesCard } from "../Components/HomePage/FeaturesCard";
import { TeamSection } from "../Components/HomePage/TeamSection";
import { SectionWhyPsichoMatch } from "../Components/HomePage/SectionWhyPsichoMatch";
import { SectionFAQs } from "../Components/HomePage/SectionFAQs";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturesCard />
      <TeamSection />
      <SectionWhyPsichoMatch />
      <SectionFAQs />
    </div>
  );
};