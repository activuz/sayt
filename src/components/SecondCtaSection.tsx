"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LeadForm } from "@/components/LeadForm";

export const SecondCtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 bg-[#f7f4ee] border-b border-[#e8e2d5]">
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1c261e] tracking-tight">
            {t.secondCta.title}
          </h2>
        </div>

        <LeadForm idPrefix="second-cta" showTitleInCard={false} />
      </div>
    </section>
  );
};
