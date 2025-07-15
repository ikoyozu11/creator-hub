import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden w-full" style={{ background: '#201A2C' }}>
      <div className="ellipse-angular-about" />
      <div className="ellipse-blur-dark" />
      <div>
        {/* About Section Content */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2
                className="font-sans font-thin text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.1] tracking-tight text-white mb-6 sm:mb-8 md:mb-10 break-words"
                style={{
                  fontFamily: 'Albert Sans, Arial, sans-serif',
                  fontWeight: 250,
                  fontStyle: 'thin',
                  letterSpacing: '-0.05em',
                  color: '#FFFBFB',
                }}
              >
                Platform ini hadir untuk menghubungkan creator
              </h2>
              <p
                className="font-sans font-light text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white break-words"
                style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 300,
                  fontStyle: 'light',
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  background: 'transparent',
                  marginBottom: '0',
                }}
              >
                dari berbagai bidang dengan para pengguna yang mencari inspirasi, ide, dan solusi melalui workflow yang praktis. Kami percaya, kolaborasi kreatif akan lebih mudah ketika prosesnya terbuka, sederhana, dan saling berbagi.<br /><br />
                Di sini, Anda bisa menemukan kreator berbakat, menjelajahi berbagai workflow, hingga membangun proses kerja yang lebih terarah dan efisien.
              </p>
              <div className="mt-8 sm:mt-10 flex justify-center">
                <a href="/connect" className="btn-jelajah flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg whitespace-nowrap">
                  Connect With Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits Content */}
        <div className="w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 md:px-8 lg:px-12 relative">
          <div className="ellipse-linear-keybenefit" />
          {/* SVG Ellipse tipis untuk menghubungkan icon centang */}
          <svg
            width="900"
            height="900"
            viewBox="0 0 900 900"
            fill="none"
            className="absolute -left-[150px] top-[40px] z-0 hidden lg:block"
            style={{ pointerEvents: 'none', opacity: 0.44 }}
          >
            <defs>
              <linearGradient id="ellipseStroke" x1="0" y1="0" x2="900" y2="900" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9460CD" />
                <stop offset="1" stopColor="#3D1654" />
              </linearGradient>
            </defs>
            <ellipse
              cx="450"
              cy="450"
              rx="440"
              ry="440"
              fill="none"
              stroke="url(#ellipseStroke)"
              strokeWidth="2"
            />
          </svg>
          <div className="flex flex-col items-start w-full text-left">
            <div className="mb-8 sm:mb-10 md:mb-12 z-10 w-full">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-white/80 mb-3 sm:mb-4 break-words" style={{fontFamily: 'Albert Sans, Arial, sans-serif'}}>Key Benefits</h3>
              <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl break-words">
                Kami menghadirkan platform yang memudahkan Anda untuk menemukan kreator, menjelajahi workflow, dan membangun proses kerja yang lebih efektif.
              </p>
            </div>
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 w-full z-10">
              {/* Item 1 */}
              <div className="flex items-start gap-3 sm:gap-4 relative ml-0 sm:ml-8 md:ml-16 lg:ml-20 xl:ml-24">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#C084FC] flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5"><circle cx="10" cy="10" r="10" fill="#C084FC"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg md:text-xl text-white/90 font-normal mb-1 break-words">Share Your Workflow</div>
                  <div className="font-bold text-white text-sm sm:text-base md:text-lg leading-snug break-words">Bagikan workflow Anda untuk membantu kreator lain menemukan cara kerja yang lebih efisien dan terarah.</div>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-start gap-3 sm:gap-4 relative ml-0 sm:ml-16 md:ml-32 lg:ml-40 xl:ml-48">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#C084FC] flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5"><circle cx="10" cy="10" r="10" fill="#C084FC"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg md:text-xl text-white/90 font-normal mb-1 break-words">Access Ready-to-Use Workflows</div>
                  <div className="font-bold text-white text-sm sm:text-base md:text-lg leading-snug break-words">Jelajahi berbagai workflow yang praktis dan dapat langsung Anda terapkan dalam proses kerja Anda.</div>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex items-start gap-3 sm:gap-4 relative ml-0 sm:ml-24 md:ml-48 lg:ml-60 xl:ml-72">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#C084FC] flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5"><circle cx="10" cy="10" r="10" fill="#C084FC"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg md:text-xl text-white/90 font-normal mb-1 break-words">Connect & Collaborate</div>
                  <div className="font-bold text-white text-sm sm:text-base md:text-lg leading-snug break-words">Bangun koneksi dan kolaborasi dengan kreator lain untuk mengembangkan proyek yang lebih maksimal.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Call to Action Section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 md:px-8 lg:px-12 py-12 sm:py-16" style={{background: 'transparent'}}>
        <div className="w-full lg:w-auto flex-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
          <div className="font-sans font-extralight text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-[#CFC6E2] break-words"
            style={{
              fontFamily: 'Albert Sans, Arial, sans-serif',
              fontWeight: 200,
              letterSpacing: '-0.01em',
              maxWidth: '700px',
            }}>
            Sudah 3.000+ orang bergabung.<br />
            Ayo, mulai perjalanan Anda hari ini!
          </div>
        </div>
        <a
          href="/auth"
          className="rounded-full px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-3 mt-6 lg:mt-0 lg:ml-8 whitespace-nowrap flex-shrink-0"
          style={{
            background: 'linear-gradient(90deg, #D900FF 0%, #9500FF 100%)',
            color: '#fff',
            boxShadow: '0 2px 8px 0 #9500FF33',
            minWidth: '180px',
            transition: 'filter 0.2s',
          }}
        >
          Join Community
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h2.25A2.25 2.25 0 0 1 21 6v12a2.25 2.25 0 0 1-2.25 2.25H16.5m-6-4.5 3-3m0 0-3-3m3 3H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
