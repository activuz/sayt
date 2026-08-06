"use client";

import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { FounderSection } from "@/components/FounderSection";
import { OpenStateSection } from "@/components/OpenStateSection";
import { SecondCtaSection } from "@/components/SecondCtaSection";
import { Footer } from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";

export default function HomePage() {
  useEffect(() => {
    trackEvent("page_view");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#eef2dc] antialiased text-[#1e3a0f] selection:bg-[#3d6b2e] selection:text-white">
      {/* 1. Header */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero (Form directly inside) */}
        <Hero />

        {/* 3. Problem Section */}
        <ProblemSection />

        {/* 4. Solution Section */}
        <SolutionSection />

        {/* 5. Founder Section */}
        <FounderSection />

        {/* 6. Open State Transparency Box */}
        <OpenStateSection />

        {/* 7. Second CTA Form */}
        <SecondCtaSection />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
