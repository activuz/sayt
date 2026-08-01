"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const FounderSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 bg-[#f7f4ee] border-b border-[#e8e2d5]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1c261e] tracking-tight">
            {t.founder.title}
          </h2>
        </div>

        <div className="bg-[#ffffff] rounded-2xl border-2 border-[#e8e2d5] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Left Avatar / Photo */}
          <div className="shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#1b3e2b] shadow-md relative bg-[#e8e2d5] flex items-center justify-center">
              <Image
                src="/images.jpg"
                alt="Mirfozil — Zotdor.uz asoschisi"
                width={150}
                height={150}
                className="object-cover w-full h-full"
                onError={(e) => {
                  // Fallback to SVG if image file missing
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-[#1b3e2b] text-white font-black text-3xl flex items-center justify-center -z-10">
                M
              </div>
            </div>
          </div>

          {/* Right Bio & Direct Contact */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <p className="text-sm sm:text-base text-[#1c261e] font-semibold leading-relaxed">
              {t.founder.bio}
            </p>

            <div className="pt-2 border-t border-[#e8e2d5] space-y-2">
              <p className="text-xs font-black uppercase tracking-wider text-[#8c6f56]">
                {t.founder.contactLead}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://t.me/mirfozil_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-touch px-4 py-2.5 bg-[#0088cc] hover:bg-[#0077b5] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center space-x-2 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.02-2.22-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.09 5.63-5.09c.25-.22-.05-.34-.38-.12l-6.96 4.38-3-.94c-.65-.2-.67-.65.14-.97l11.71-4.51c.54-.2 1.02.13.84.96z" />
                  </svg>
                  <span>{t.founder.telegramBtn}</span>
                </a>

                <a
                  href="tel:+998901234567"
                  className="min-h-touch px-4 py-2.5 bg-[#1b3e2b] hover:bg-[#122b1e] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center space-x-2 shadow-sm"
                >
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
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
