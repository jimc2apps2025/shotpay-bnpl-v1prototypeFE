import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0C0D0C]">
      <div className="relative w-full">
        <Image
          src="/footer-image.png"
          alt="ShotPay Footer"
          width={1980}
          height={334}
          className="w-full h-auto object-cover"
          priority={false}
          quality={90}
        />
      </div>
    </footer>
  );
}
