// import Image from "next/image";
// import {
//   FaGithub,
//   FaLinkedinIn,
//   FaFacebookF,
//   FaInstagram,
//   FaTelegram,
// } from "react-icons/fa";
// import { portfolioContent } from "@/lib/portfolioContent";

// const socialIconMap = {
//   github: FaGithub,
//   linkedin: FaLinkedinIn,
//   facebook: FaFacebookF,
//   instagram: FaInstagram,
//   telegram: FaTelegram,
// };

// export default function HeroSection() {
//   const { heroSection, platform } = portfolioContent;
//   const colors = platform.brandColors;

//   return (
//     <section
//       id="home"
//       className="relative w-full min-h-screen bg-black text-white overflow-hidden"
//     >
//       {/* ================= Mobile Background Image ================= */}
//       {heroSection.imageUrl && (
//         <div className="absolute inset-0 md:hidden pointer-events-none overflow-hidden">
//           <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] h-[90%]">
//             <Image
//               src={heroSection.imageUrl}
//               alt={`${platform.name} Hero`}
//               fill
//               priority
//               className="object-contain object-top grayscale opacity-20"
//             />
//           </div>

//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-black/55" />
//         </div>
//       )}

//       <div className="flex min-h-screen items-center">
//         {/* ================= Left Content ================= */}
//         <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center min-h-screen px-6 sm:px-8 md:px-16 lg:px-24 pt-24 pb-10 md:py-0">

//           <p className="text-base sm:text-lg text-zinc-300 mb-3 text-center md:text-left">
//             {heroSection.name}
//           </p>

//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-center md:text-left">
//             {heroSection.title}
//           </h1>

//           <p className="text-zinc-300 leading-8 max-w-lg mb-8 text-center md:text-left mx-auto md:mx-0">
//             {heroSection.description}
//           </p>

//           <div className="flex justify-center md:justify-start">
//             <a
//               href={heroSection.buttonLink}
//               className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium text-white transition hover:opacity-90"
//               style={{
//                 backgroundColor: colors.primary,
//               }}
//             >
//               {heroSection.buttonName}
//             </a>
//           </div>

//           {/* ================= Social Icons ================= */}
//           <div className="flex justify-center md:justify-start gap-5 mt-10">
//             {heroSection.socialMedia.map((social) => {
//               const Icon =
//                 socialIconMap[
//                   social.icon.toLowerCase() as keyof typeof socialIconMap
//                 ];

//               if (!Icon) return null;

//               return (
//                 <a
//                   key={social.name}
//                   href={social.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={social.name}
//                   className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center hover:border-white transition-all duration-300 hover:scale-110"
//                 >
//                   <Icon size={18} />
//                 </a>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= Desktop Image ================= */}
//         {heroSection.imageUrl && (
//           <div className="relative hidden md:flex w-1/2 h-screen items-end justify-end">
//             <div className="relative w-full h-[95vh]">
//               <Image
//                 src={heroSection.imageUrl}
//                 alt={`${platform.name} Hero`}
//                 fill
//                 priority
//                 className="object-contain object-bottom grayscale"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// import Image from "next/image";
// import {
//   FaGithub,
//   FaLinkedinIn,
//   FaFacebookF,
//   FaInstagram,
//   FaTelegram,
// } from "react-icons/fa";
// import { portfolioContent } from "@/lib/portfolioContent";

// const socialIconMap = {
//   github: FaGithub,
//   linkedin: FaLinkedinIn,
//   facebook: FaFacebookF,
//   instagram: FaInstagram,
//   telegram: FaTelegram,
// };

// export default function HeroSection() {
//   const { heroSection, platform } = portfolioContent;
//   const colors = platform.brandColors;

//   return (
//     <section
//       id="home"
//       className="relative w-full min-h-screen bg-black text-white overflow-hidden"
//     >
//       {/* ================= Mobile Background Image ================= */}
//       {heroSection.imageUrl && (
//         <div className="absolute inset-0 md:hidden pointer-events-none overflow-hidden">
//           <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] h-[96%]">
//             <Image
//               src={heroSection.imageUrl}
//               alt={`${platform.name} Hero`}
//               fill
//               priority
//               className="object-contain object-top grayscale opacity-25"
//             />
//           </div>

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/55" />
//         </div>
//       )}

//       <div className="flex min-h-screen items-center">
//         {/* ================= Left Content ================= */}
//         <div className="relative z-10 flex w-full min-h-[100svh] flex-col justify-center px-6 pt-16 pb-4 sm:px-8 md:min-h-screen md:w-1/2 md:px-16 md:py-0 lg:px-24">

//           {/* Name */}
//           <p className="mb-2 text-center text-base text-zinc-300 sm:text-lg md:text-left">
//             {heroSection.name}
//           </p>

//           {/* Title */}
//           <h1 className="mb-4 text-center text-4xl font-bold leading-tight sm:text-5xl md:text-left md:text-6xl lg:text-7xl">
//             {heroSection.title}
//           </h1>

//           {/* Description */}
//           <p className="mx-auto mb-6 max-w-lg text-center leading-7 text-zinc-300 md:mx-0 md:text-left">
//             {heroSection.description}
//           </p>

//           {/* Button */}
//           <div className="flex justify-center md:justify-start">
//             <a
//               href={heroSection.buttonLink}
//               className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium text-white transition hover:opacity-90"
//               style={{
//                 backgroundColor: colors.primary,
//               }}
//             >
//               {heroSection.buttonName}
//             </a>
//           </div>

//           {/* Social Icons */}
//           <div className="mt-6 flex justify-center gap-4 md:justify-start">
//             {heroSection.socialMedia.map((social) => {
//               const Icon =
//                 socialIconMap[
//                   social.icon.toLowerCase() as keyof typeof socialIconMap
//                 ];

//               if (!Icon) return null;

//               return (
//                 <a
//                   key={social.name}
//                   href={social.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={social.name}
//                   className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 transition-all duration-300 hover:scale-110 hover:border-white"
//                 >
//                   <Icon size={18} />
//                 </a>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= Desktop Image ================= */}
//         {heroSection.imageUrl && (
//           <div className="relative hidden h-screen w-1/2 items-end justify-end md:flex">
//             <div className="relative h-[95vh] w-full">
//               <Image
//                 src={heroSection.imageUrl}
//                 alt={`${platform.name} Hero`}
//                 fill
//                 priority
//                 className="object-contain object-bottom grayscale"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import Image from "next/image";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import { portfolioContent } from "@/lib/portfolioContent";

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  telegram: FaTelegram,
};

export default function HeroSection() {
  const { heroSection, platform } = portfolioContent;
  const colors = platform.brandColors;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black text-white min-h-[92svh] md:min-h-screen"
    >
      {/* ================= Mobile Background Image ================= */}
      {heroSection.imageUrl && (
        <div className="absolute inset-0 md:hidden pointer-events-none overflow-hidden">
          <Image
            src={heroSection.imageUrl}
            alt={`${platform.name} Hero`}
            fill
            priority
            className="object-cover object-top opacity-20 grayscale"
          />

          <div className="absolute inset-0 bg-black/65" />
        </div>
      )}

      <div className="flex min-h-[92svh] md:min-h-screen items-center">
        {/* ================= Left Content ================= */}
        <div
          className="
            relative z-10
            flex w-full flex-col
            justify-start md:justify-center
            min-h-[92svh] md:min-h-screen
            px-6 sm:px-8 md:px-16 lg:px-24
            pt-28 md:pt-0
            pb-0
            md:w-1/2
          "
        >
          {/* Name */}
          <p className="mb-2 text-center text-base text-zinc-300 sm:text-lg md:text-left">
            {heroSection.name}
          </p>

          {/* Title */}
          <h1 className="mb-4 text-center text-5xl font-bold leading-tight md:text-left md:text-6xl lg:text-7xl">
            {heroSection.title}
          </h1>

          {/* Description */}
          <p className="mx-auto mb-5 max-w-lg text-center leading-7 text-zinc-300 md:mx-0 md:text-left">
            {heroSection.description}
          </p>

          {/* Button */}
          <div className="flex justify-center md:justify-start">
            <a
              href={heroSection.buttonLink}
              className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {heroSection.buttonName}
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-5 flex justify-center gap-4 md:justify-start">
            {heroSection.socialMedia.map((social) => {
              const Icon =
                socialIconMap[
                  social.icon.toLowerCase() as keyof typeof socialIconMap
                ];

              if (!Icon) return null;

              return (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 transition-all duration-300 hover:scale-110 hover:border-white"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        {/* ================= Desktop Image ================= */}
        {heroSection.imageUrl && (
          <div className="relative hidden h-screen w-1/2 items-end justify-end md:flex">
            <div className="relative h-[95vh] w-full">
              <Image
                src={heroSection.imageUrl}
                alt={`${platform.name} Hero`}
                fill
                priority
                className="object-contain object-bottom grayscale"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}