import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { portfolioContent } from "@/lib/portfolioContent";

const socialIconMap: Record<string, IconType> = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
};

export default function Footer() {
  const { footer, navbar, contact, platform } = portfolioContent;
  const colors = platform.brandColors;

  return (
    <footer
      className="w-full text-[#8f8f8f]"
      style={{
        backgroundColor: colors.background || "#070707",
      }}
    >
      <div className="w-full mx-auto px-6 md:px-16 lg:px-24 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_330px] items-center gap-8">
          {/* Left Name / Logo */}
          <div className="md:border-r md:border-[#3b3b3b] md:pr-8">
            <h2 className="text-white text-xl md:text-2xl font-medium tracking-wide">
              {footer.name}
            </h2>
          </div>

          {/* Middle Links - Centered */}
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap gap-6 md:gap-7 text-sm font-semibold mb-3 justify-center">
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
              <p className="text-sm font-semibold text-center">
                {footer.copyrightText}
              </p>
            )}
          </div>

          {/* Right Social - with left border */}
          <div className="flex flex-col items-start md:items-end gap-3 md:border-l md:border-[#3b3b3b] md:pl-8">
            <div className="flex items-center gap-6 text-lg">
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
                    className="transition hover:text-white"
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