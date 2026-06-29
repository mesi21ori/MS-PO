import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { portfolioContent } from "@/lib/portfolioContent";

const socialIconMap: Record<string, IconType> = {
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  telegram: FaTelegram,
};

export default function Footer() {
  const { footer, navbar, platform } = portfolioContent;
  const colors = platform.brandColors;

  return (
    <footer
      className="relative z-[999] w-full block text-[#8f8f8f] border-t border-white/10"
      style={{
        backgroundColor: colors.background || "#05040f",
      }}
    >
      <div className="w-full px-6 py-10 md:px-16 lg:px-24">
        <div className="flex flex-col gap-8 text-center md:grid md:grid-cols-[260px_1fr_260px] md:items-center md:text-left">
          {/* Left Name */}
          <div className="md:border-r md:border-[#3b3b3b] md:pr-8">
            <h2 className="text-white text-xl md:text-2xl font-medium tracking-wide">
              {footer.name}
            </h2>
          </div>

          {/* Center Links */}
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-5 text-sm font-semibold mb-4">
              {navbar.menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="hover:text-white transition"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {footer.copyrightText && (
              <p className="text-xs md:text-sm font-semibold leading-relaxed">
                {footer.copyrightText}
              </p>
            )}
          </div>

          {/* Right Social */}
          <div className="flex justify-center md:justify-end md:border-l md:border-[#3b3b3b] md:pl-8">
            <div className="flex items-center gap-6 text-xl">
              {footer.socialMedia.map((social) => {
                const Icon = socialIconMap[social.icon.toLowerCase()];

                if (!Icon) return null;

                return (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="transition hover:scale-110"
                    style={{
                      color: colors.primary,
                    }}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}