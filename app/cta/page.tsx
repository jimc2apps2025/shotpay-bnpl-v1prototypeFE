import Image from 'next/image';
import Link from 'next/link';

export default function CTAPage() {
  return (
    <div className="min-h-screen bg-[#0C0D0C] flex items-center justify-center py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full">
            <Image
              src="/cta-image.png"
              alt="Call to Action"
              width={376}
              height={199}
              className="w-full h-auto object-contain mx-auto"
              priority
              quality={90}
            />
          </div>
          
          {/* Optional: Add navigation or additional content */}
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-block bg-[#4C773B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#5a8a47] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
