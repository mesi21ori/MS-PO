import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaTelegram } from "react-icons/fa";
import { portfolioContent } from "@/lib/portfolioContent";

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  Telegram:FaTelegram
};

export default function HeroSection() {
  const { heroSection, platform } = portfolioContent;
  const colors = platform.brandColors;

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 flex items-center overflow-hidden"
    >
      {/* Left Content */}
      <div className="relative z-10 max-w-xl pt-24 md:pt-16">
        <p className="text-lg md:text-xl text-zinc-300 mb-4">
          {heroSection.name}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {heroSection.title}
        </h1>

        <p className="text-zinc-300 max-w-md leading-relaxed mb-8">
          {heroSection.description}
        </p>

        <a
          href={heroSection.buttonLink}
          className="inline-flex items-center justify-center text-white px-6 py-3 rounded-lg text-sm font-medium transition hover:opacity-90"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          {heroSection.buttonName}
        </a>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mt-12">
          {heroSection.socialMedia.map((social) => {
            const Icon =
              socialIconMap[social.icon.toLowerCase() as keyof typeof socialIconMap];

            if (!Icon) return null;

            return (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-zinc-400 transition"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Desktop Image */}
      {heroSection.imageUrl && (
        <div className="absolute right-0 bottom-0 hidden md:block w-[45%] lg:w-[48%]">
          <Image
            src={heroSection.imageUrl}
            alt={`${platform.name} hero image`}
            width={700}
            height={800}
            className="w-full h-auto object-contain grayscale"
            priority
          />
        </div>
      )}

      {/* Mobile Image */}
      {heroSection.imageUrl && (
        <div className="absolute right-[-80px] bottom-0 opacity-30 md:hidden w-[95%]">
          <Image
            src={heroSection.imageUrl}
            alt={`${platform.name} hero image`}
            width={700}
            height={800}
            className="w-full h-auto object-contain grayscale"
            priority
          />
        </div>
      )}
    </section>
  );
}