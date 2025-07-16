import { Button } from "@/components/ui/button";

export default function CreatorsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#201A2C' }}>
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 
            className="heading-mobile-xl sm:heading-mobile-lg md:text-5xl lg:text-6xl xl:text-7xl font-thin text-white mb-4 sm:mb-6"
            style={{
              fontFamily: 'Albert Sans, Arial, sans-serif',
              fontWeight: 250,
              letterSpacing: '-0.02em',
            }}
          >
            Temukan dan hubungi creator automation terbaik
          </h1>
          <p 
            className="body-text-mobile sm:body-text-mobile-lg md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto"
            style={{
              fontFamily: 'Albert Sans, Arial, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.01em',
            }}
          >
            dari seluruh Indonesia
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Placeholder for creators */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
              <img src="/placeholder-user.jpg" alt={`Creator ${i + 1}`} className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover"/>
              <h3 
                className="text-responsive-lg sm:text-xl font-bold text-white mb-1 break-words"
                style={{
                  fontFamily: 'Albert Sans, Arial, sans-serif',
                }}
              >
                Creator {i + 1}
              </h3>
              <p 
                className="body-text-mobile sm:body-text-mobile-lg text-gray-300 break-words"
                style={{
                  fontFamily: 'Albert Sans, Arial, sans-serif',
                }}
              >
                Description of creator {i + 1}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
