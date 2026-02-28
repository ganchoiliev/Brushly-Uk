import Hero from '../components/Hero';
import Credibility from '../components/Credibility';
import ValueProp from '../components/ValueProp';
import Services from '../components/Services';
import { RecentWorks } from '../components/RecentWorks';
import { CredibilitySection } from '../components/CredibilitySection';
import AboutUs from '../components/AboutUs';
import ContactTestimonials from '../components/ContactTestimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Credibility />
      <ValueProp />
      <Services />
      <RecentWorks />
      <CredibilitySection />
      <AboutUs />
      <ContactTestimonials />
    </>
  );
}
