// // // // import Image from "next/image";
// // // // import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaTelegram } from "react-icons/fa";
// // // // import { portfolioContent } from "@/lib/portfolioContent";

// // // // const socialIconMap = {
// // // //   github: FaGithub,
// // // //   linkedin: FaLinkedinIn,
// // // //   facebook: FaFacebookF,
// // // //   instagram: FaInstagram,
// // // //   Telegram:FaTelegram
// // // // };

// // // // export default function HeroSection() {
// // // //   const { heroSection, platform } = portfolioContent;
// // // //   const colors = platform.brandColors;

// // // //   return (
// // // //     <section
// // // //       id="home"
// // // //       className="relative min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 flex items-center overflow-hidden"
// // // //     >
// // // //       {/* Left Content */}
// // // //       <div className="relative z-10 max-w-xl pt-24 md:pt-16">
// // // //         <p className="text-lg md:text-xl text-zinc-300 mb-4">
// // // //           {heroSection.name}
// // // //         </p>

// // // //         <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
// // // //           {heroSection.title}
// // // //         </h1>

// // // //         <p className="text-zinc-300 max-w-md leading-relaxed mb-8">
// // // //           {heroSection.description}
// // // //         </p>

// // // //         <a
// // // //           href={heroSection.buttonLink}
// // // //           className="inline-flex items-center justify-center text-white px-6 py-3 rounded-lg text-sm font-medium transition hover:opacity-90"
// // // //           style={{
// // // //             backgroundColor: colors.primary,
// // // //           }}
// // // //         >
// // // //           {heroSection.buttonName}
// // // //         </a>

// // // //         {/* Social Icons */}
// // // //         <div className="flex items-center gap-6 mt-12">
// // // //           {heroSection.socialMedia.map((social) => {
// // // //             const Icon =
// // // //               socialIconMap[social.icon.toLowerCase() as keyof typeof socialIconMap];

// // // //             if (!Icon) return null;

// // // //             return (
// // // //               <a
// // // //                 key={social.name}
// // // //                 href={social.link}
// // // //                 target="_blank"
// // // //                 rel="noopener noreferrer"
// // // //                 aria-label={social.name}
// // // //                 className="w-8 h-8 flex items-center justify-center text-white hover:text-zinc-400 transition"
// // // //               >
// // // //                 <Icon size={20} />
// // // //               </a>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </div>

// // // //       {/* Desktop Image */}
// // // //       {heroSection.imageUrl && (
// // // //         <div className="absolute right-0 bottom-0 hidden md:block w-[45%] lg:w-[48%]">
// // // //           <Image
// // // //             src={heroSection.imageUrl}
// // // //             alt={`${platform.name} hero image`}
// // // //             width={700}
// // // //             height={800}
// // // //             className="w-full h-auto object-contain grayscale"
// // // //             priority
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {/* Mobile Image */}
// // // //       {heroSection.imageUrl && (
// // // //         <div className="absolute right-[-80px] bottom-0 opacity-30 md:hidden w-[95%]">
// // // //           <Image
// // // //             src={heroSection.imageUrl}
// // // //             alt={`${platform.name} hero image`}
// // // //             width={700}
// // // //             height={800}
// // // //             className="w-full h-auto object-contain grayscale"
// // // //             priority
// // // //           />
// // // //         </div>
// // // //       )}
// // // //     </section>
// // // //   );
// // // // }


// // // import Image from "next/image";
// // // import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaTelegram } from "react-icons/fa";
// // // import { portfolioContent } from "@/lib/portfolioContent";

// // // const socialIconMap = {
// // //   github: FaGithub,
// // //   linkedin: FaLinkedinIn,
// // //   facebook: FaFacebookF,
// // //   instagram: FaInstagram,
// // //   telegram: FaTelegram
// // // };

// // // export default function HeroSection() {
// // //   const { heroSection, platform } = portfolioContent;
// // //   const colors = platform.brandColors;

// // //   return (
// // //     <section
// // //       id="home"
// // //       className="relative min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 flex items-center overflow-hidden"
// // //     >
// // //       {/* Left Content */}
// // //       <div className="relative z-10 max-w-xl pt-24 md:pt-16">
// // //         <p className="text-lg md:text-xl text-zinc-300 mb-4">
// // //           {heroSection.name}
// // //         </p>

// // //         <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
// // //           {heroSection.title}
// // //         </h1>

// // //         <p className="text-zinc-300 max-w-md leading-relaxed mb-8">
// // //           {heroSection.description}
// // //         </p>

// // //         <a
// // //           href={heroSection.buttonLink}
// // //           className="inline-flex items-center justify-center text-white px-6 py-3 rounded-lg text-sm font-medium transition hover:opacity-90"
// // //           style={{
// // //             backgroundColor: colors.primary,
// // //           }}
// // //         >
// // //           {heroSection.buttonName}
// // //         </a>

// // //         {/* Social Icons */}
// // //         <div className="flex items-center gap-6 mt-12">
// // //           {heroSection.socialMedia.map((social) => {
// // //             const Icon =
// // //               socialIconMap[social.icon.toLowerCase() as keyof typeof socialIconMap];

// // //             if (!Icon) return null;

// // //             return (
// // //               <a
// // //                 key={social.name}
// // //                 href={social.link}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 aria-label={social.name}
// // //                 className="w-8 h-8 flex items-center justify-center text-white hover:text-zinc-400 transition"
// // //               >
// // //                 <Icon size={20} />
// // //               </a>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>

// // //       {/* Desktop Image - Properly contained */}
// // //       {heroSection.imageUrl && (
// // //         <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block w-[40%] lg:w-[45%] max-h-[80vh]">
// // //           <div className="relative w-full h-full flex items-end justify-end">
// // //             <Image
// // //               src={heroSection.imageUrl}
// // //               alt={`${platform.name} hero image`}
// // //               width={700}
// // //               height={800}
// // //               className="w-full h-auto max-h-[80vh] object-contain grayscale"
// // //               priority
// // //             />
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Mobile Image - Properly contained */}
// // //       {heroSection.imageUrl && (
// // //         <div className="absolute right-0 bottom-0 opacity-20 md:hidden w-[60%] max-h-[60vh]">
// // //           <div className="relative w-full h-full flex items-end justify-end">
// // //             <Image
// // //               src={heroSection.imageUrl}
// // //               alt={`${platform.name} hero image`}
// // //               width={700}
// // //               height={800}
// // //               className="w-full h-auto max-h-[60vh] object-contain grayscale"
// // //               priority
// // //             />
// // //           </div>
// // //         </div>
// // //       )}
// // //     </section>
// // //   );
// // // }


// // import Image from "next/image";
// // import {
// //   FaGithub,
// //   FaLinkedinIn,
// //   FaFacebookF,
// //   FaInstagram,
// //   FaTelegram,
// // } from "react-icons/fa";
// // import { portfolioContent } from "@/lib/portfolioContent";

// // const socialIconMap = {
// //   github: FaGithub,
// //   linkedin: FaLinkedinIn,
// //   facebook: FaFacebookF,
// //   instagram: FaInstagram,
// //   telegram: FaTelegram,
// // };

// // export default function HeroSection() {
// //   const { heroSection, platform } = portfolioContent;
// //   const colors = platform.brandColors;

// //   return (
// //     <section
// //       id="home"
// //       className="relative w-full min-h-screen bg-black overflow-hidden text-white"
// //     >
// //       <div className="flex min-h-screen w-full items-center">
// //         {/* Left Content */}
// //         <div className="relative z-10 w-full md:w-1/2 px-8 md:px-16 lg:px-24">
// //           <p className="mb-4 text-lg md:text-xl text-zinc-300">
// //             {heroSection.name}
// //           </p>

// //           <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
// //             {heroSection.title}
// //           </h1>

// //           <p className="mb-8 max-w-lg leading-8 text-zinc-300">
// //             {heroSection.description}
// //           </p>

// //           <a
// //             href={heroSection.buttonLink}
// //             className="inline-flex items-center justify-center rounded-lg px-7 py-3 font-medium text-white transition hover:opacity-90"
// //             style={{
// //               backgroundColor: colors.primary,
// //             }}
// //           >
// //             {heroSection.buttonName}
// //           </a>

// //           {/* Social Icons */}
// //           <div className="mt-12 flex gap-5">
// //             {heroSection.socialMedia.map((social) => {
// //               const Icon =
// //                 socialIconMap[
// //                   social.icon.toLowerCase() as keyof typeof socialIconMap
// //                 ];

// //               if (!Icon) return null;

// //               return (
// //                 <a
// //                   key={social.name}
// //                   href={social.link}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label={social.name}
// //                   className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 transition hover:border-white"
// //                 >
// //                   <Icon size={18} />
// //                 </a>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* Desktop Image */}
// //         {heroSection.imageUrl && (
// //           <div className="relative hidden h-screen w-1/2 md:flex items-end justify-end">
// //             <div className="relative h-[95vh] w-full">
// //               <Image
// //                 src={heroSection.imageUrl}
// //                 alt={`${platform.name} hero`}
// //                 fill
// //                 priority
// //                 className="object-contain object-bottom grayscale"
// //               />
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Mobile Image */}
// //       {heroSection.imageUrl && (
// //         <div className="pointer-events-none absolute bottom-0 right-0 h-[50vh] w-[70%] opacity-20 md:hidden">
// //           <Image
// //             src={heroSection.imageUrl}
// //             alt={`${platform.name} hero`}
// //             fill
// //             priority
// //             className="object-contain object-bottom grayscale"
// //           />
// //         </div>
// //       )}
// //     </section>
// //   );
// // }
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

//  return (
//   <section
//     id="home"
//     className="relative w-full min-h-screen bg-black text-white overflow-hidden"
//   >
//     {/* ---------- Mobile Background Image ---------- */}
//     {heroSection.imageUrl && (
//       <div className="absolute inset-0 md:hidden pointer-events-none">
//         <Image
//           src={heroSection.imageUrl}
//           alt={`${platform.name} Hero`}
//           fill
//           priority
//           className="object-contain object-bottom opacity-50 grayscale"
//         />

//         {/* Dark overlay so text stays readable */}
//         <div className="absolute inset-0 bg-black/55" />
//       </div>
//     )}

//     <div className="flex min-h-screen items-center">
//       {/* ================= LEFT CONTENT ================= */}
//       <div className="relative z-10 w-full md:w-1/2 px-6 sm:px-8 md:px-16 lg:px-24 py-20 md:py-0">

//         <p className="text-base sm:text-lg text-zinc-300 mb-3 text-center md:text-left">
//           {heroSection.name}
//         </p>

//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-center md:text-left">
//           {heroSection.title}
//         </h1>

//         <p className="text-zinc-300 leading-7 max-w-lg mb-8 text-center md:text-left mx-auto md:mx-0">
//           {heroSection.description}
//         </p>

//         <div className="flex justify-center md:justify-start">
//           <a
//             href={heroSection.buttonLink}
//             className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium text-white transition hover:opacity-90"
//             style={{
//               backgroundColor: colors.primary,
//             }}
//           >
//             {heroSection.buttonName}
//           </a>
//         </div>

//         {/* Social Icons */}
//         <div className="flex justify-center md:justify-start gap-5 mt-10">
//           {heroSection.socialMedia.map((social) => {
//             const Icon =
//               socialIconMap[
//                 social.icon.toLowerCase() as keyof typeof socialIconMap
//               ];

//             if (!Icon) return null;

//             return (
//               <a
//                 key={social.name}
//                 href={social.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={social.name}
//                 className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center hover:border-white transition-all duration-300 hover:scale-110"
//               >
//                 <Icon size={18} />
//               </a>
//             );
//           })}
//         </div>
//       </div>

//       {/* ================= Desktop Image ================= */}
//       {heroSection.imageUrl && (
//         <div className="relative hidden md:flex h-screen w-1/2 items-end justify-end">
//           <div className="relative h-[95vh] w-full">
//             <Image
//               src={heroSection.imageUrl}
//               alt={`${platform.name} Hero`}
//               fill
//               priority
//               className="object-contain object-bottom grayscale"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   </section>
// );
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
      className="relative w-full min-h-screen bg-black text-white overflow-hidden"
    >
      {/* ================= Mobile Background Image ================= */}
      {heroSection.imageUrl && (
        <div className="absolute inset-0 md:hidden pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] h-[90%]">
            <Image
              src={heroSection.imageUrl}
              alt={`${platform.name} Hero`}
              fill
              priority
              className="object-contain object-top grayscale opacity-20"
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

      <div className="flex min-h-screen items-center">
        {/* ================= Left Content ================= */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center min-h-screen px-6 sm:px-8 md:px-16 lg:px-24 pt-24 pb-10 md:py-0">

          <p className="text-base sm:text-lg text-zinc-300 mb-3 text-center md:text-left">
            {heroSection.name}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-center md:text-left">
            {heroSection.title}
          </h1>

          <p className="text-zinc-300 leading-8 max-w-lg mb-8 text-center md:text-left mx-auto md:mx-0">
            {heroSection.description}
          </p>

          <div className="flex justify-center md:justify-start">
            <a
              href={heroSection.buttonLink}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium text-white transition hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {heroSection.buttonName}
            </a>
          </div>

          {/* ================= Social Icons ================= */}
          <div className="flex justify-center md:justify-start gap-5 mt-10">
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
                  className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center hover:border-white transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* ================= Desktop Image ================= */}
        {heroSection.imageUrl && (
          <div className="relative hidden md:flex w-1/2 h-screen items-end justify-end">
            <div className="relative w-full h-[95vh]">
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