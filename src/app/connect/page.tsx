import React from "react";
// import { HeaderNav } from "@/components/header-nav";

const ConnectPage = () => {
  return (
    <div style={{ background: '#201A2C', minHeight: '100vh' }}>
      {/* <HeaderNav /> */}
      <section className="relative overflow-hidden w-full" style={{ background: '#201A2C' }}>
        <div className="ellipse-angular-about" />
        <div className="ellipse-blur-dark" />
        <div className="py-24">
          <div className="container mx-auto px-4 flex justify-center">
            <div style={{ maxWidth: '820px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <h2
                style={{
                  fontFamily: 'Albert Sans, Arial, sans-serif',
                  fontWeight: 250,
                  fontStyle: 'thin',
                  fontSize: '72px',
                  lineHeight: '88px',
                  letterSpacing: '-0.05em',
                  color: '#FFFBFB',
                  marginBottom: '36px',
                }}
              >
                Connect With Us
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 300,
                  fontStyle: 'light',
                  fontSize: '20px',
                  lineHeight: '150%',
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  background: 'transparent',
                  marginBottom: '0',
                }}
              >
                Kami sangat terbuka untuk kolaborasi, pertanyaan, maupun saran. Silakan hubungi kami melalui tombol di bawah ini atau melalui media sosial komunitas.
              </p>
              <div className="mt-10 flex justify-center">
                <a href="mailto:info@n8nid.com" className="btn-jelajah flex items-center gap-3" style={{fontSize: '20px'}}>
                  Email Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConnectPage; 