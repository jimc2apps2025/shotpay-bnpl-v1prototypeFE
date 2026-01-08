import Link from 'next/link';
import Image from 'next/image';
import ShieldLogo from '@/components/ShieldLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0D0C]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C0D0C] via-[#192B17] to-[#0C0D0C]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4C773B] rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4C773B] rounded-full blur-3xl opacity-20"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
            Succeeding in a Complex Industry
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            The first end-to-end e-commerce firearms toolkit built for the 2A community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-[#4C773B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#5a8a47] transition-colors"
            >
              Browse Products
            </Link>
            <Link 
              href="/ffl-dealers"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Find Dealers
            </Link>
          </div>
        </div>
      </section>

      {/* Two Column Section - Shield 50 & Keyboard */}
      <section className="bg-[#0C0D0C] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Block - Shield with 50 */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <ShieldLogo size="lg" className="h-32 w-32 md:h-40 md:w-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-bold text-white">50</span>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-white/80 text-lg">
                Over 50 FFL dealers trust ShotPay to power their e-commerce operations with seamless BNPL financing solutions.
              </p>
            </div>

            {/* Right Block - Keyboard/Device Image */}
            <div className="relative">
              <div className="bg-[#192B17] rounded-lg p-8 md:p-12 border border-[#4C773B]/30">
                <div className="aspect-video bg-gradient-to-br from-[#4C773B]/20 to-[#192B17] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-[#4C773B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">Digital Commerce Platform</h3>
                    <p className="text-white/70">Streamlined operations for modern firearms retailers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Step Section */}
      <section className="bg-[#0C0D0C] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">How It Works</h2>
              <div className="space-y-8">
                {[
                  { num: '1', title: 'Browse Products', desc: 'Explore our extensive catalog of firearms and accessories' },
                  { num: '2', title: 'Choose Payment Plan', desc: 'Select Pay in 6 with zero interest and no service fees' },
                  { num: '3', title: 'Complete Purchase', desc: 'Get your items delivered to your local FFL dealer' },
                ].map((step) => (
                  <div key={step.num} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#4C773B] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{step.num}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/70">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#192B17] rounded-lg p-8 aspect-square flex items-center justify-center border border-[#4C773B]/30">
                <div className="text-center">
                  <svg className="w-32 h-32 mx-auto mb-4 text-[#4C773B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-white/70">Easy & Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Background Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C0D0C] mb-4">Why Choose ShotPay</h2>
            <p className="text-[#192B17] text-lg max-w-2xl mx-auto">
              Built specifically for the firearms industry with compliance and security at the core
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '🔒', title: 'Secure Transactions', desc: 'Bank-level encryption and secure payment processing' },
              { icon: '⚡', title: 'Fast Approval', desc: 'Instant BNPL approval with no credit check required' },
              { icon: '🎯', title: 'Industry Focused', desc: 'Designed specifically for firearms and tactical gear' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#FCFCFC] rounded-lg p-6 border border-[#192B17]/10 shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#0C0D0C] mb-2">{feature.title}</h3>
                <p className="text-[#192B17]">{feature.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-block bg-[#4C773B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#5a8a47] transition-colors"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      {/* Four Feature Blocks Section */}
      <section className="bg-[#0C0D0C] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Secure Platform',
                desc: 'Enterprise-grade security'
              },
              { 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Compliance Ready',
                desc: 'FFL compliant solutions'
              },
              { 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                title: 'Customer Focus',
                desc: 'Dedicated support team'
              },
              { 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Customizable',
                desc: 'Flexible integration options'
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#192B17] rounded-lg p-6 border border-[#4C773B]/30 text-center">
                <div className="text-[#4C773B] mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Helping You Succeed Section */}
      <section className="bg-[#0C0D0C] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4C773B] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
              Helping You Succeed
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Partner with ShotPay to grow your firearms business with flexible payment solutions that your customers love.
            </p>
            <div className="bg-[#192B17] rounded-lg p-8 md:p-12 border border-[#4C773B]/30">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">For Customers</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start">
                      <span className="text-[#4C773B] mr-2">✓</span>
                      <span>Pay in 6 installments with zero interest</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#4C773B] mr-2">✓</span>
                      <span>No service fees or hidden charges</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#4C773B] mr-2">✓</span>
                      <span>Fast approval process</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">For Dealers</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start">
                      <span className="text-[#4C773B] mr-2">✓</span>
                      <span>Increase average order value</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#4C773B] mr-2">✓</span>
                      <span>Reduce cart abandonment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#4C773B] mr-2">✓</span>
                      <span>FFL compliant solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platinum Section */}
      <section className="bg-[#0C0D0C] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Block - Platinum Shield */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <ShieldLogo size="lg" className="h-32 w-32 md:h-40 md:w-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">PLATINUM</span>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Premium Partnership
              </h2>
              <p className="text-white/80 text-lg">
                Join our Platinum partner program for exclusive benefits, priority support, and advanced features.
              </p>
            </div>

            {/* Right Block */}
            <div className="relative">
              <div className="bg-[#192B17] rounded-lg p-8 md:p-12 border border-[#4C773B]/30">
                <div className="aspect-video bg-gradient-to-br from-[#4C773B]/20 to-[#192B17] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-[#4C773B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">Premium Features</h3>
                    <p className="text-white/70">Advanced analytics and dedicated support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C0D0C] border-t border-[#192B17]/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <ShieldLogo size="sm" className="h-12 w-12 mb-4" />
              <p className="text-white/70 text-sm">
                The first end-to-end e-commerce firearms toolkit built for the 2A community.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-white/70 hover:text-[#4C773B] text-sm">Browse Catalog</Link></li>
                <li><Link href="/cart" className="text-white/70 hover:text-[#4C773B] text-sm">Shopping Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/ffl-dealers" className="text-white/70 hover:text-[#4C773B] text-sm">Find Dealers</Link></li>
                <li><Link href="/dashboard" className="text-white/70 hover:text-[#4C773B] text-sm">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-[#4C773B] text-sm">About</a></li>
                <li><a href="#" className="text-white/70 hover:text-[#4C773B] text-sm">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#192B17]/20 pt-8 text-center">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} ShotPay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
