import HomeProductsSection from '@/components/HomeProductsSection';
import HeroVideoModal from '@/components/HeroVideoModal';
import HomeCtaSection from "@/components/HomeCtaSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Clickable Hero (500px tall, contained image, opens video modal) */}
     <HeroVideoModal
       maxHeightPx={500}
       aspectRatio={2560 / 938} // IMPORTANT: set to your banner’s real ratio
       backgroundColor="#000000"
       backgroundImageUrl="/home-banner-v2.png"
       videoUrl="https://shotpay.com/wp-content/uploads/2026/01/Video-final.mp4"
     />

      {/* Products Section under hero */}
      <HomeProductsSection />
        
      <HomeCtaSection />
    </div>
  );
}
