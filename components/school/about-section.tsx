// import {
//   FaReact,
//   FaNodeJs,
//   FaGitAlt,
//   FaDatabase,
//   FaCode,
// } from "react-icons/fa";
// import {
//   SiNextdotjs,
//   SiTypescript,
//   SiTailwindcss,
//   SiMongodb,
//   SiPostgresql,
//   SiFirebase,
//   SiGraphql,
// } from "react-icons/si";
// import { portfolioContent } from "@/lib/portfolioContent";

// const skillIconMap = {
//   react: FaReact,
//   nextjs: SiNextdotjs,
//   "next.js": SiNextdotjs,
//   typescript: SiTypescript,
//   nodejs: FaNodeJs,
//   "node.js": FaNodeJs,
//   tailwindcss: SiTailwindcss,
//   mongodb: SiMongodb,
//   postgresql: SiPostgresql,
//   firebase: SiFirebase,
//   git: FaGitAlt,
//   graphql: SiGraphql,
//   database: FaDatabase,
//   code: FaCode,
// };

// export default function AboutSection() {
//   const { aboutMe, platform } = portfolioContent;
//   const colors = platform.brandColors;

//   const paragraphs = [
//     aboutMe.paragraph1,
//     aboutMe.paragraph2,
//     aboutMe.paragraph3,
//   ];

//   return (
//     <section
//       id="about"
//       className="min-h-screen text-white px-6 md:px-16 lg:px-24 py-20"
//       style={{
//         backgroundColor: colors.background || "#070707",
//       }}
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
//         {/* Left Text */}
//         <div>
//           <h2 className="text-4xl md:text-5xl font-bold mb-10">
//             About{" "}
//             <span style={{ color: colors.primary }}>
//               Me
//             </span>
//           </h2>

//           <div className="space-y-8 text-zinc-400 text-lg leading-relaxed max-w-2xl">
//             {paragraphs.map((paragraph, index) => (
//               <p key={index}>{paragraph}</p>
//             ))}
//           </div>
//         </div>

//         {/* Right Skills */}
//         <div className="lg:pt-20">
//           <h3 className="text-2xl font-semibold text-zinc-300 mb-8">
//             Skills & Technologies
//           </h3>

//           <div className="flex flex-wrap gap-4 max-w-xl">
//             {aboutMe.skills.map((skill) => {
//               const Icon =
//                 skillIconMap[
//                   skill.icon.toLowerCase() as keyof typeof skillIconMap
//                 ] || FaCode;

//               return (
//                 <span
//                   key={skill.name}
//                   className="group flex items-center gap-3 px-6 py-3 rounded-lg bg-[#1d1d1f] border border-zinc-800 text-zinc-300 text-base shadow-sm transition"
//                   style={{
//                     borderColor: "rgba(255,255,255,0.08)",
//                   }}
//                 >
//                   <Icon
//                     size={20}
//                     className="transition group-hover:scale-110"
//                     style={{
//                       color: colors.primary,
//                     }}
//                   />
//                   {skill.name}
//                 </span>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGraphql,
} from "react-icons/si";
import { portfolioContent } from "@/lib/portfolioContent";

const skillIconMap = {
  react: FaReact,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  typescript: SiTypescript,
  nodejs: FaNodeJs,
  "node.js": FaNodeJs,
  tailwindcss: SiTailwindcss,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  firebase: SiFirebase,
  git: FaGitAlt,
  graphql: SiGraphql,
  database: FaDatabase,
  code: FaCode,
};

export default function AboutSection() {
  const { aboutMe, platform } = portfolioContent;
  const colors = platform.brandColors;

  const paragraphs = [
    aboutMe.paragraph1,
    aboutMe.paragraph2,
    aboutMe.paragraph3,
  ];

  return (
    <section
      id="about"
      className="w-full py-14 md:py-20 px-6 sm:px-8 md:px-16 lg:px-24 text-white"
      style={{
        backgroundColor: colors.background || "#070707",
      }}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* ================= Left Content ================= */}
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-10 text-center lg:text-left">
            About{" "}
            <span style={{ color: colors.primary }}>
              Me
            </span>
          </h2>

          <div className="space-y-5 md:space-y-8 text-zinc-400 text-base sm:text-lg leading-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* ================= Right Skills ================= */}
        <div className="lg:pt-16">
          <h3 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-6 md:mb-8 text-center lg:text-left">
            Skills & Technologies
          </h3>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
            {aboutMe.skills.map((skill) => {
              const Icon =
                skillIconMap[
                  skill.icon.toLowerCase() as keyof typeof skillIconMap
                ] || FaCode;

              return (
                <span
                  key={skill.name}
                  className="group flex items-center gap-2 md:gap-3 rounded-xl border border-zinc-800 bg-[#1d1d1f] px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110 md:w-5 md:h-5"
                    style={{
                      color: colors.primary,
                    }}
                  />
                  <span>{skill.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}