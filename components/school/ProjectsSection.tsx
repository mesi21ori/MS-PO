// "use client";

// import { useMemo, useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { portfolioContent } from "@/lib/portfolioContent";

// export default function ProjectsSection() {
//   const { projects, platform } = portfolioContent;
//   const colors = platform.brandColors;

//   const [activeTab, setActiveTab] = useState("All");
//   const [showAll, setShowAll] = useState(false);

//   const allProjects = useMemo(() => {
//     return projects.tabs.flatMap((tab) =>
//       tab.projects.map((project) => ({
//         ...project,
//         category: tab.tabName,
//       }))
//     );
//   }, [projects.tabs]);

//   const tabNames = ["All", ...projects.tabs.map((tab) => tab.tabName)];

//   const selectedProjects =
//     activeTab === "All"
//       ? allProjects
//       : allProjects.filter((project) => project.category === activeTab);

//   const visibleProjects = showAll
//     ? selectedProjects
//     : selectedProjects.slice(0, 3);

//   const handleTabClick = (tabName: string) => {
//     setActiveTab(tabName);
//     setShowAll(false);
//   };

//   return (
//     <section
//       id="projects"
//       className="min-h-screen text-white px-6 md:px-16 lg:px-24 py-20"
//       style={{
//         backgroundColor: colors.background || "#05040f",
//       }}
//     >
//       <div className="max-w-7xl mx-auto text-center">
//         {/* Section Heading */}
//         <h2 className="text-4xl md:text-5xl font-bold mb-4">
//           {projects.title.split(" ")[0]}{" "}
//           <span style={{ color: colors.primary }}>
//             {projects.title.split(" ").slice(1).join(" ")}
//           </span>
//         </h2>

//         {projects.description && (
//           <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
//             {projects.description}
//           </p>
//         )}

//         {/* Project Category Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-14">
//           {tabNames.map((tabName) => {
//             const isActive = activeTab === tabName;

//             return (
//               <button
//                 key={tabName}
//                 onClick={() => handleTabClick(tabName)}
//                 className="px-6 py-3 rounded-full border text-sm font-semibold transition"
//                 style={{
//                   backgroundColor: isActive ? colors.primary : "transparent",
//                   borderColor: isActive ? colors.primary : "#2a2a3a",
//                   color: isActive ? "#ffffff" : "#d4d4d8",
//                 }}
//               >
//                 {tabName}
//               </button>
//             );
//           })}
//         </div>

//         {/* Project Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
//           {visibleProjects.map((project) => (
//             <div
//               key={`${project.category}-${project.name}`}
//               className="relative bg-[#11111d] rounded-2xl   shadow-xl"
//             >
//               {/* Fake card border */}
//               <div className="absolute inset-0 rounded-2xl border border-[#2a2a3a] z-10 pointer-events-none" />

//               {/* Header */}
//               <div className="relative z-20 px-5 py-5 border-b border-[#252536]">
//                 <p
//                   className="text-xs font-semibold mb-2"
//                   style={{ color: colors.primary }}
//                 >
//                   {project.category}
//                 </p>

//                 <h3 className="text-xl font-bold text-white">
//                   {project.name}
//                 </h3>
//               </div>

//               {/* Body */}
//               <div className="relative z-20 h-[240px] px-4 pt-9">
//                 {/* Dark back layer */}
//                 <div className="absolute top-8 left-16 right-16 h-[90px] rounded-xl bg-[#242433]" />

//                 {/* Gray back layer */}
//                 <div className="absolute top-12 left-8 right-8 h-[90px] rounded-xl bg-[#8d8d87]" />

//                 {/* Main image */}
//                 <div className="absolute left-4 right-4 top-[72px] h-[165px] rounded-xl overflow-hidden z-10">
//                   <img
//                     src={project.image}
//                     alt={project.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="relative z-20 px-5 pb-24">
//                 <p className="text-zinc-400 text-sm leading-relaxed">
//                   {project.smallDescription}
//                 </p>
//               </div>

//               {/* Black circle */}
//               <div
//                 className="absolute right-[-36px] bottom-[-36px] w-[125px] h-[125px] rounded-full z-40 pointer-events-none"
//                 style={{
//                   backgroundColor: colors.background || "#05040f",
//                 }}
//               />

//               {/* Orange link button */}
//               <a
//                 href={project.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="absolute right-4 bottom-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition hover:opacity-90"
//                 style={{
//                   backgroundColor: colors.primary,
//                 }}
//               >
//                 <FaArrowRight className="text-white text-lg -rotate-45" />
//               </a>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {visibleProjects.length === 0 && (
//           <p className="text-zinc-400 mt-10">
//             No projects found in this category.
//           </p>
//         )}

//         {/* View All Button */}
//         {selectedProjects.length > 3 && (
//           <div className="mt-12">
//             <button
//               onClick={() => setShowAll((prev) => !prev)}
//               className="text-white px-8 py-3 rounded-full text-sm font-semibold transition hover:opacity-90"
//               style={{
//                 backgroundColor: colors.primary,
//               }}
//             >
//               {showAll ? "Show Less ↑" : "View All ↗"}
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { portfolioContent } from "@/lib/portfolioContent";

const INITIAL_PROJECT_COUNT = 9;

function getProjectPreviewImage(projectLink: string, customImage?: string) {
  if (customImage && customImage.trim() !== "") {
    return customImage;
  }

  if (!projectLink || projectLink === "#") {
    return "/project-placeholder.png";
  }

  return `https://image.thum.io/get/width/1200/crop/800/${projectLink}`;
}

export default function ProjectsSection() {
  const { projects, platform } = portfolioContent;
  const colors = platform.brandColors;

  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const allProjects = useMemo(() => {
    return projects.tabs.flatMap((tab) =>
      tab.projects.map((project) => ({
        ...project,
        category: tab.tabName,
      }))
    );
  }, [projects.tabs]);

  const tabNames = ["All", ...projects.tabs.map((tab) => tab.tabName)];

  const selectedProjects =
    activeTab === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeTab);

  const visibleProjects = showAll
    ? selectedProjects
    : selectedProjects.slice(0, INITIAL_PROJECT_COUNT);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setShowAll(false);
  };

  return (
    <section
      id="projects"
      className="min-h-screen text-white px-6 md:px-16 lg:px-24 py-20"
      style={{
        backgroundColor: colors.background || "#05040f",
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {projects.title.split(" ")[0]}{" "}
          <span style={{ color: colors.primary }}>
            {projects.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>

        {projects.description && (
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
            {projects.description}
          </p>
        )}

        {/* Project Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {tabNames.map((tabName) => {
            const isActive = activeTab === tabName;

            return (
              <button
                key={tabName}
                onClick={() => handleTabClick(tabName)}
                className="px-6 py-3 rounded-full border text-sm font-semibold transition"
                style={{
                  backgroundColor: isActive ? colors.primary : "transparent",
                  borderColor: isActive ? colors.primary : "#2a2a3a",
                  color: isActive ? "#ffffff" : "#d4d4d8",
                }}
              >
                {tabName}
              </button>
            );
          })}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {visibleProjects.map((project) => {
            const previewImage = getProjectPreviewImage(
              project.link,
              project.image
            );

            return (
              <div
                key={`${project.category}-${project.name}`}
                className="relative bg-[#11111d] rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Fake card border */}
                <div className="absolute inset-0 rounded-2xl border border-[#2a2a3a] z-10 pointer-events-none" />

                {/* Header */}
                <div className="relative z-20 px-5 py-5 border-b border-[#252536]">
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: colors.primary }}
                  >
                    {project.category}
                  </p>

                  <h3 className="text-xl font-bold text-white">
                    {project.name}
                  </h3>
                </div>

                {/* Body */}
                <div className="relative z-20 h-[240px] px-4 pt-9">
                  <div className="absolute top-8 left-16 right-16 h-[90px] rounded-xl bg-[#242433]" />
                  <div className="absolute top-12 left-8 right-8 h-[90px] rounded-xl bg-[#8d8d87]" />

                  <div className="absolute left-4 right-4 top-[72px] h-[165px] rounded-xl overflow-hidden z-10 bg-zinc-800">
                    <img
                      src={previewImage}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="relative z-20 px-5 pb-24">
                  {project.role && (
                    <p
                      className="text-xs font-semibold mb-2"
                      style={{ color: colors.primary }}
                    >
                      {project.role}
                    </p>
                  )}

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.smallDescription}
                  </p>
                </div>

                {/* Black circle */}
                <div
                  className="absolute right-[-36px] bottom-[-36px] w-[125px] h-[125px] rounded-full z-40 pointer-events-none"
                  style={{
                    backgroundColor: colors.background || "#05040f",
                  }}
                />

                {/* Link button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-4 bottom-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition hover:opacity-90"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                >
                  <FaArrowRight className="text-white text-lg -rotate-45" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {visibleProjects.length === 0 && (
          <p className="text-zinc-400 mt-10">
            No projects found in this category.
          </p>
        )}

        {/* View All Button */}
        {selectedProjects.length > INITIAL_PROJECT_COUNT && (
          <div className="mt-12">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-white px-8 py-3 rounded-full text-sm font-semibold transition hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {showAll ? "Show Less ↑" : "View All ↗"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}