import Link from 'next/link';
import MainLogo from './MainLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-5">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Brand / Address / Disclosure */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center">
              <MainLogo size="md" className="h-12 w-auto" />
            </Link>

            <div className="text-sm text-white/80 leading-relaxed">
              <p>2111 I-35 N Frontage Rd Suite 2105</p>
              <p>New Braunfels, TX 78130</p>
            </div>

            <div className="border-l-2 border-[#4C773B] pl-4 text-xs text-white/70 leading-relaxed max-w-sm">
              ShotPay is a financial technology company, not a bank.
              Financing provided by partner financial institutions.
              All transactions subject to approval and applicable law.
            </div>

            <div>
              <Link
                href="https://www.linkedin.com/company/shotpay"
                target="_blank"
                aria-label="ShotPay on LinkedIn"
                className="inline-flex items-center justify-center w-8 h-8 border border-white/20 rounded hover:border-[#4C773B] transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 
                    2.239 5 5 5h14c2.761 0 5-2.239 
                    5-5v-14c0-2.761-2.239-5-5-5zm-11 
                    19h-3v-10h3v10zm-1.5-11.268c-.966 
                    0-1.75-.79-1.75-1.764s.784-1.764 
                    1.75-1.764 1.75.79 1.75 
                    1.764-.784 1.764-1.75 
                    1.764zm13.5 
                    11.268h-3v-5.604c0-1.337-.027-3.058-1.865-3.058-1.865 
                    0-2.151 1.454-2.151 
                    2.958v5.704h-3v-10h2.881v1.367h.041c.401-.76 
                    1.379-1.561 
                    2.838-1.561 3.034 0 3.596 1.998 
                    3.596 4.596v5.598z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Discover */}
          <div className="space-y-4">
            <h4 className="text-[#4C773B] font-semibold uppercase tracking-wide">
              Discover
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="https://shotpay.com/our-team" className="hover:text-[#4C773B] transition">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="https://shotpay.com/contact" className="hover:text-[#4C773B] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h4 className="text-[#4C773B] font-semibold uppercase tracking-wide">
              Legal
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="https://shotpay.com/terms" className="hover:text-[#4C773B] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="https://shotpay.com/privacy" className="hover:text-[#4C773B] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://shotpay.com/financing-disclosures" className="hover:text-[#4C773B] transition">
                  Financing Disclosures
                </Link>
              </li>
              <li>
                <Link href="https://shotpay.com/compliance" className="hover:text-[#4C773B] transition">
                  Lawful Commerce &amp; Compliance
                </Link>
              </li>
              <li>
                <Link href="https://shotpay.com/cookies" className="hover:text-[#4C773B] transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="https://shotpay.com/accessibility" className="hover:text-[#4C773B] transition">
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/60">
          © {year} ShotPay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
