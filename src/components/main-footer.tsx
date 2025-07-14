import React from "react";
import { MessageCircle, Instagram, Github } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className="relative w-full bg-[#201A2C] text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-6 flex flex-col min-h-[320px]">
        {/* Konten utama */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-0">
          {/* Kiri: Judul & Deskripsi */}
          <div className="flex-1 min-w-[260px]">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-2">N8N Indonesia<br /><span className="font-light">Community</span></h2>
            <p className="text-base md:text-lg text-white/80 max-w-md mt-4">
              Komunitas automation terbesar di Indonesia. Bergabunglah dengan ribuan developer yang membangun workflow powerful.
            </p>
          </div>
          {/* Kanan: Menu */}
          <div className="flex flex-row gap-16 md:gap-24 mt-8 md:mt-0">
            <div>
              <h4 className="font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="/workflows" className="hover:underline">Workflow</a></li>
                <li><a href="/directory" className="hover:underline">Creator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">About Us</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:underline">Terms of Use</a></li>
                <li><a href="#" className="hover:underline">Service Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Garis horizontal */}
        <div className="w-full border-t border-white/20 my-8"></div>
        {/* Bawah: copyright & ikon sosial */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-white/60 text-center md:text-left">
            &copy; 2025 N8N Indonesia Creator Hub. Made with by the community.
          </p>
          <div className="flex items-center gap-6 mt-2 md:mt-0">
            <a href="https://n8nid.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#9460CD] transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/programmer30an" target="_blank" rel="noopener noreferrer" className="hover:text-[#9460CD] transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#9460CD] transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
