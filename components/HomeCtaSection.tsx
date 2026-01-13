// components/HomeCtaSection.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomeCtaSection() {
  return (
	<section className="bg-white py-12 md:py-16">
	  <div className="container mx-auto px-4">
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
		  
		  {/* LEFT CARD */}
		  <div className="relative overflow-hidden rounded-2xl bg-black shadow-lg text-center">
			{/* green fade at bottom */}
			<div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#4C773B]" />

			<div className="relative p-8 md:p-10 min-h-[420px] flex flex-col">
			  <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.95]">
				<span className="text-white">Platforms We</span>
				<br />
				<span className="text-[#4C773B]">Integrate</span>{' '}
				<span className="text-white">With</span>
			  </h3>

			  {/* IMAGE AREA (replaces laptop mock) */}
			  <div className="mt-10 flex-1 flex items-end justify-center">
				<div className="relative w-full max-w-lg">
				  <Image
					src="/computer-768x461.png"
					alt="Supported ecommerce platforms"
					width={768}
					height={461}
					priority
					className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
				  />
				</div>
			  </div>
			</div>
		  </div>

		  {/* RIGHT CARD */}
		  <div className="relative overflow-hidden rounded-2xl shadow-lg">
			{/* BASE MAP BACKGROUND */}
			<div
			  className="absolute inset-0 bg-cover bg-center"
			  style={{ backgroundImage: "url('/map.webp')" }}
			/>
		  
			{/* DARK + GREEN OVERLAYS (for contrast) */}
			<div className="absolute inset-0 bg-black/60" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(76,119,59,0.35),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_55%)]" />
			<div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
		  
			{/* CONTENT */}
			<div className="relative p-8 md:p-10 min-h-[420px] flex flex-col text-center">
			  <Image
				src="/logo-shield2.png"
				alt="ShotPay"
				width={200}
				height={100}
				priority
				className="mx-auto h-auto"
			  />
		  
			  <h3 className="mt-6 text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.95]">
				<span className="text-white">Ready to</span>{' '}
				<span className="text-[#4C773B]">Activate</span>
				<br />
				<span className="text-white">Pay-in-4?</span>
			  </h3>
		  
			  <p className="mt-4 max-w-xl mx-auto text-white/80">
				ShotPay helps merchants close more sales while directly
				strengthening the industry and community we love.
			  </p>
		  
			  <div className="mt-7">
				<Link
				  href="https://shotpay.com/contact-us"
				  className="inline-flex items-center gap-3 rounded-xl bg-[#4C773B] px-6 py-3 font-bold text-white shadow-md hover:shadow-lg hover:bg-[#3f6631] transition"
				>
				  CONTACT SALES
				  <span aria-hidden>»</span>
				</Link>
			  </div>
		  
			  <div className="flex-1" />
			</div>
		  </div>


		</div>
	  </div>
	</section>
  );
}
