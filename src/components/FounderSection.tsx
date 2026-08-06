"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const FounderSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 px-4 sm:px-6 bg-[#dce8c8] relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-8 right-16 text-[#3d6b2e] text-2xl star-spin select-none hidden md:block" aria-hidden="true">✳</div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-[#1e3a0f] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.founder.title}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#c5d4a8] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
          {/* Tilted decorative frame on photo */}
          <div className="shrink-0 relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-[3px] border-[#1e3a0f] shadow-md relative bg-[#dce8c8] flex items-center justify-center rotate-3">
              <Image
                src="/images.webp"
                alt="Baxtiyor — Zotdor.uz asoschisi"
                width={144}
                height={144}
                className="object-cover w-full h-full -rotate-3"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-[#3d6b2e] text-[#eef2dc] font-black text-4xl flex items-center justify-center -z-10" style={{ fontFamily: "var(--font-display)" }}>
                B
              </div>
            </div>
            {/* Small decorative star near avatar */}
            <div className="absolute -bottom-2 -right-3 text-[#3d6b2e] text-lg star-spin select-none" aria-hidden="true" style={{ animationDelay: '2s' }}>✳</div>
          </div>

          {/* Right Bio & Direct Contact */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <p className="text-sm sm:text-base text-[#4a5e3a] font-medium leading-relaxed">
              {t.founder.bio}
            </p>

            <div className="pt-3 border-t border-[#c5d4a8] space-y-3">
              <p className="text-xs font-black uppercase tracking-wider text-[#3d6b2e]">
                {t.founder.contactLead}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://t.me/jahongirtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-touch px-5 py-3 bg-[#0088cc] hover:bg-[#0077b5] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-full transition-all inline-flex items-center space-x-2 shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.02-2.22-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.09 5.63-5.09c.25-.22-.05-.34-.38-.12l-6.96 4.38-3-.94c-.65-.2-.67-.65.14-.97l11.71-4.51c.54-.2 1.02.13.84.96z" />
                  </svg>
                  <span>{t.founder.telegramBtn}</span>
                </a>

                <a
                  href="tel:+998938848910"
                  className="min-h-touch px-5 py-3 bg-[#1e3a0f] hover:bg-[#2a4f17] active:scale-95 text-[#eef2dc] font-bold text-xs sm:text-sm rounded-full transition-all inline-flex items-center space-x-2 shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{t.founder.phoneBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
