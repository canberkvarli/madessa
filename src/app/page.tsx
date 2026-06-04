import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OfferStrip from "@/components/OfferStrip";
import Collections from "@/components/Collections";
import ValuePillars from "@/components/ValuePillars";
import Story from "@/components/Story";
import TrustBand from "@/components/TrustBand";
import InstagramStrip from "@/components/InstagramStrip";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import LifestyleBreak from "@/components/LifestyleBreak";
import CategoryBand from "@/components/CategoryBand";
import RecentlyViewed from "@/components/RecentlyViewed";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <OfferStrip />
        <CategoryBand />
        <Collections />
        <LifestyleBreak />
        <ValuePillars />
        <Story />
        <TrustBand />
        <RecentlyViewed />
        <InstagramStrip />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
