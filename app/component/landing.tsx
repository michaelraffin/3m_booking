import React from "react";

export default function FormlessLanding() {
  return (
    <div className="relative min-h-screen w-full bg-[#fbfbfb] text-neutral-900 flex flex-col justify-between overflow-hidden font-sans select-none">
      {/* --- Subtle Background Dot Grid / Noise Texture --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(#1a1a1a 0.75px, transparent 0.75px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* --- Left Halftone Graphic / Placeholder --- */}
      <div className="absolute left-0 bottom-12 md:bottom-20 w-80 md:w-[480px] lg:w-[560px] pointer-events-none -translate-x-12 opacity-80 mix-blend-multiply transition-all duration-700">
        <img
          src="https://i.pinimg.com/736x/10/77/4a/10774a9393236ba3c6eb8b1dbecc50cd.jpg"
          alt="Abstract Left Touch Hand Placeholder"
          className="w-full h-auto object-contain filter grayscale contrast-200 brightness-110"
          style={{
            maskImage:
              "radial-gradient(circle at left bottom, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at left bottom, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* --- Right Halftone Graphic / Placeholder --- */}
      <div className="absolute right-0 bottom-4 md:bottom-12 w-80 md:w-[480px] lg:w-[560px] pointer-events-none translate-x-10 opacity-80 mix-blend-multiply transition-all duration-700">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D22AQH4IF1b-s87kA/feedshare-image-high-res/B4DaBCqqQHIQAU-/0/1787824874834?e=1789603200&v=beta&t=FLJS4u0bMwVFU1hw3uPKnU29Ps9dDj-QyD2YMcvYkkw"
          alt="Abstract Right Touch Hand Placeholder"
          className="w-full h-auto object-contain filter grayscale contrast-200 brightness-110"
          style={{
            maskImage:
              "radial-gradient(circle at right bottom, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at right bottom, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* --- Navigation Bar --- */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 w-full max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="text-xl md:text-2xl font-semibold tracking-tight">
          3MVisual Booking
        </div>

        {/* Navigation Links */}
        {/*<nav className="hidden md:flex items-center space-x-8 text-xs md:text-sm font-medium text-neutral-600">
          <a href="#home" className="hover:text-black transition-colors">
            Home
          </a>
          <a
            href="#how-it-works"
            className="hover:text-black transition-colors"
          >
            How it works
          </a>
          <a href="#solutions" className="hover:text-black transition-colors">
            Solutions
          </a>
          <a href="#insights" className="hover:text-black transition-colors">
            Insights
          </a>
          <a href="#faq" className="hover:text-black transition-colors">
            FAQ
          </a>
        </nav>*/}

        {/* CTA Button */}
        <div>
          <a href="tel:+639976473649">
            <button className="bg-black hover:bg-neutral-800 text-white text-xs md:text-sm font-normal py-2.5 px-6 rounded-full transition-all duration-200">
              Contact us
            </button>
          </a>
        </div>
      </header>

      {/* --- Main Hero Content --- */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto my-auto py-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-neutral-400 leading-[1.15] mb-4">
          Discover New Dimensions <br />
          <span className="text-black font-medium">and Shape What’s Next</span>
        </h1>

        <p className="text-neutral-500 text-xs sm:text-sm md:text-base max-w-lg mx-auto font-normal leading-relaxed mb-8">
          From concept to creation — we design intelligent solutions that
          transform ideas into unforgettable event experiences.
        </p>

        <button className="bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm py-3 px-8 rounded-full shadow-sm hover:shadow transition-all duration-200">
          Enter the space
        </button>
      </main>

      {/* --- Footer Details --- */}
      <footer className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-6 w-full max-w-7xl mx-auto text-[11px] md:text-xs text-neutral-400 gap-4">
        {/* Left Footer Note */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          {/*The journey begins in silence.*/}
        </div>

        {/* Scroll Indicator */}
        <div className="w-full md:w-1/3 flex items-center justify-center gap-1.5 cursor-pointer hover:text-black transition-colors">
          <span>scroll</span>
          <svg
            className="w-3.5 h-3.5 stroke-[1.5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        {/* Right Footer Tagline */}
        <div className="w-full md:w-1/3 text-center md:text-right leading-tight">
          A digital environment for focused thinking,
          <br />
          structured creativity, and future-ready solutions.
        </div>
      </footer>
    </div>
  );
}
