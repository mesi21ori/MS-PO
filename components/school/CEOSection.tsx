"use client";

import { useState } from "react";
import { FaBriefcase, FaChevronRight } from "react-icons/fa";
import { portfolioContent } from "@/lib/portfolioContent";

export default function WorkExperienceSection() {
  const { workExperience, platform } = portfolioContent;
  const colors = platform.brandColors;

  const companies = workExperience.companies;
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const handleNext = () => {
    if (companies.length === 0) return;

    setActiveIndex((prev) => (prev + 1) % companies.length);
    setAnimationKey((prev) => prev + 1);
  };

  if (companies.length === 0) {
    return (
      <section
        id="experience"
        className="min-h-screen flex items-center justify-center text-white px-6"
        style={{ backgroundColor: colors.background || "#05040f" }}
      >
        <p>No work experience added yet.</p>
      </section>
    );
  }

  const activeCompany = companies[activeIndex];
  const fadedCompanies = companies.filter((_, index) => index !== activeIndex);

  return (
    <section
      id="experience"
      className="relative w-full min-h-[650px] bg-white overflow-hidden flex items-center"
    >
      <div className="absolute inset-x-0 top-[130px] h-[430px] bg-[#f7f7f7]" />
      <div className="absolute inset-x-0 top-[130px] h-[430px] bg-white/75" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        {/* Left Text */}
        <div className="w-full lg:w-[38%] relative z-50">
          <h2 className="text-[44px] md:text-[56px] leading-tight text-[#1f2933] font-light mb-10">
            {workExperience.headline}
          </h2>

          <p className="text-[#8e98a3] text-[20px] md:text-[24px] leading-relaxed mb-12">
            {workExperience.smallDescription}
          </p>

          <a
            href={workExperience.buttonLink}
            className="inline-flex px-10 py-4 rounded-full border text-[#222] text-base font-semibold transition hover:text-white"
            style={{
              borderColor: colors.primary,
            }}
          >
            {workExperience.buttonName}
          </a>
        </div>

        {/* Desktop Card Area */}
        <div className="hidden lg:block relative w-[760px] h-[470px]">
          {/* Faded background cards */}
          {fadedCompanies.slice(0, 3).map((company, index) => {
            const ghostPositions = [
              "left-[60px] top-[230px]",
              "left-[460px] top-[60px]",
              "left-[430px] top-[255px]",
            ];

            return (
              <div
                key={`ghost-${company.name}-${index}-${animationKey}`}
                className={`absolute ${ghostPositions[index]} w-[310px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.10)] px-8 py-8 opacity-20 blur-[0.4px] animate-ghost-card`}
              >
                <div
                  className="absolute -top-6 -right-6 w-14 h-14 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  <FaBriefcase size={20} />
                </div>

                <div className="flex flex-col items-start">
                  <h4 className="text-xl font-bold text-[#222] mb-1">
                    {company.name}
                  </h4>

                  {company.role && (
                    <p className="text-base font-bold text-black mb-1">
                      {company.role}
                    </p>
                  )}

                  {(company.startDate || company.endDate) && (
                    <p className="text-sm text-[#8d98a3] mb-3">
                      {company.startDate} - {company.endDate || "Present"}
                    </p>
                  )}

                  <p className="text-base leading-relaxed text-[#8d98a3] text-left">
                    {company.smallTextDescription}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Clear active card with animation */}
          <div
            key={`active-${activeCompany.name}-${animationKey}`}
            className="absolute left-[230px] top-[100px] z-40 w-[380px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.18)] px-9 py-9 animate-active-card"
          >
            <div
              className="absolute -top-7 -right-7 w-16 h-16 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: colors.primary }}
            >
              <FaBriefcase size={22} />
            </div>

            <div className="flex flex-col items-start">
              <h4 className="text-3xl font-bold text-[#222] mb-1">
                {activeCompany.name}
              </h4>

              {activeCompany.role && (
                <p className="text-lg font-bold text-black mb-1">
                  {activeCompany.role}
                </p>
              )}

              {(activeCompany.startDate || activeCompany.endDate) && (
                <p className="text-sm text-[#8d98a3] mb-4">
                  {activeCompany.startDate} -{" "}
                  {activeCompany.endDate || "Present"}
                </p>
              )}

              <p className="text-base leading-relaxed text-[#8d98a3] text-left">
                {activeCompany.smallTextDescription}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          {companies.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-[60px] top-[230px] z-50 w-16 h-16 rounded-full text-white flex items-center justify-center shadow-xl transition hover:scale-110 active:scale-95"
              style={{ backgroundColor: colors.primary }}
            >
              <FaChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden mt-14 w-full">
          <div
            key={`mobile-${activeCompany.name}-${animationKey}`}
            className="relative bg-white shadow-[0_25px_60px_rgba(0,0,0,0.16)] px-8 py-8 animate-active-card"
          >
            <div
              className="absolute -top-6 -right-6 w-14 h-14 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: colors.primary }}
            >
              <FaBriefcase size={18} />
            </div>

            <div className="flex flex-col items-start">
              <h4 className="text-2xl font-bold text-[#222] mb-1">
                {activeCompany.name}
              </h4>

              {activeCompany.role && (
                <p className="text-base font-bold text-black mb-1">
                  {activeCompany.role}
                </p>
              )}

              {(activeCompany.startDate || activeCompany.endDate) && (
                <p className="text-sm text-[#8d98a3] mb-3">
                  {activeCompany.startDate} -{" "}
                  {activeCompany.endDate || "Present"}
                </p>
              )}

              <p className="text-base leading-relaxed text-[#8d98a3] text-left">
                {activeCompany.smallTextDescription}
              </p>
            </div>
          </div>

          {companies.length > 1 && (
            <button
              onClick={handleNext}
              className="mt-8 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl transition hover:scale-110 active:scale-95"
              style={{ backgroundColor: colors.primary }}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}