import React from "react";
import { MessageCircle, Instagram, Github } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className="footer-transparent relative w-full text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-12 pb-8 sm:pb-12 flex flex-col min-h-[280px] sm:min-h-[320px]">
        {/* Konten utama */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 sm:gap-10 lg:gap-0">
          {/* Kiri: Judul & Deskripsi */}
          <div className="flex-1 min-w-0 max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-2 sm:mb-4">
              N8N Indonesia
              <br />
              <span className="font-light">Community</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mt-3 sm:mt-4 leading-relaxed">
              Komunitas automation terbesar di Indonesia. Bergabunglah dengan
              ribuan developer yang membangun workflow powerful.
            </p>
          </div>
          
          {/* Kanan: Menu */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-24 mt-6 lg:mt-0">
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Explore</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/80">
                <li>
                  <a href="/workflows" className="hover:text-white hover:underline transition-colors">
                    Workflow
                  </a>
                </li>
                <li>
                  <a href="/directory" className="hover:text-white hover:underline transition-colors">
                    Creator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">About Us</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/80">
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-colors">
                    Service Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Garis horizontal */}
        <div className="w-full border-t border-white/20 my-6 sm:my-8"></div>
        
        {/* Bawah: copyright & ikon sosial */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-white/60 text-center sm:text-left">
            &copy; 2025 N8N Indonesia Creator Hub. Made with ❤️ by the community.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
            <a
              href="https://n8nid.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9460CD] transition-colors p-1"
              aria-label="Visit N8N Indonesia Website"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://instagram.com/programmer30an"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9460CD] transition-colors p-1"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9460CD] transition-colors p-1"
              aria-label="Visit our GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
