import Hero from "../components/Hero";
import Services from "../components/Services";
import PremiumSlider from "../components/PremiumSlider";
import Stats from "../components/Stats";
import WhyChooseUs from "../components/WhyChooseUs";
import OfferSlider from "../components/OfferSlider";
import Footer from "../components/Footer";
import UserQuickActions from "../components/UserQuickAction";
import BestOptions from "../components/BestOptions";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <UserQuickActions />
      <Services />
      <BestOptions />
      <OfferSlider />
      <PremiumSlider />
      <Stats />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
