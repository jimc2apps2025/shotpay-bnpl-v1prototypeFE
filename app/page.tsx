import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0D0C]">
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/home-banner.webp"
            alt="Pay-in-4 Financing for the Shooting, Hunting, Outdoor & Tactical Industry"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
      </section>
    </div>
  );
}
