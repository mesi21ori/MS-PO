import { PortfolioWebsiteContent } from "@/types/portfolio";

export const portfolioContent: PortfolioWebsiteContent = {
  platform: {
    name: "Meseret Shumet",
    logo: "/logo.png",
    brandColors: {
      primary: "#ff6b3d",
      secondary: "#202257",
      background: "#05040f",
      text: "#ffffff",
    },
  },

  navbar: {
    logo: "/logo.png",
    menuItems: [
      { name: "Home", link: "/" },
      { name: "About", link: "#about" },
      { name: "Projects", link: "#projects" },
      { name: "Experience", link: "#experience" },
    ],
    buttonName: "Let's Talk",
    buttonLink: "/contact",
  },

  heroSection: {
    name: "I am Meseret Shumet",
    title: "Full Stack Developer",
    description:
      "Building robust server-side architectures and translating complex logic into seamless, high-performance web applications with Next.js, Node.js, and TypeScript.",
    buttonName: "Download CV",
    buttonLink: "/cv.pdf",
    imageUrl: "/hero-image.png",
    socialMedia: [
      {
        name: "LinkedIn",
        icon: "linkedin",
        link: "https://linkedin.com",
      },
      {
        name: "GitHub",
        icon: "github",
        link: "https://github.com",
      },
       {
        name: "instagram",
        icon: "instagram",
        link: "https://instagram.com",
      },
       {
        name: "telegram",
        icon: "telegram",
        link: "https://telegram.com",
      },
      {
        name: "facebook",
        icon: "facebook",
        link: "https://facebook.com",
      },
    ],
  },

  aboutMe: {
    paragraph1:
      "I am Meseret Shumet, a Full-Stack Developer passionate about engineering modern, highly performant, and scalable software systems.",
    paragraph2:
      "I work cleanly across the full development stack, from architecting responsive, type-safe frontend interfaces to building robust server-side logic, secure REST APIs, and optimized database schemas.",
    paragraph3:
      "I place a strong emphasis on industry best practices, utilizing strict version control, clean code patterns, and efficient data models to deliver reliable, maintainable solutions. I thrive on solving complex backend challenges and believe that great digital products are built on a foundation of sound logic, security, and efficient system architecture.",
  skills: [
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Java", icon: "java" },
  { name: "C++", icon: "cplusplus" },

  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "ShadCN UI", icon: "shadcn" },

  { name: "Node.js", icon: "nodejs" },
  { name: "Express", icon: "express" },
  { name: "Prisma", icon: "prisma" },
  { name: "Drizzle ORM", icon: "drizzle" },

  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },

  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Swagger", icon: "swagger" },
],
  },

projects: {
  title: "My Projects",
  description:
    "A collection of full-stack, frontend, backend, AI, and web/mobile projects I have worked on.",

  tabs: [
    {
      tabName: "Full Stack",
      projects: [
        {
          name: "NSAA Aerospace Dynamic Website",
          image: "/project-nsaa.png",
          link: "https://aersospacemain-1.onrender.com",
          role: "Full Stack Developer",
          smallDescription:
            "A dynamic NSAA aerospace website built with Next.js, TypeScript, Prisma ORM, PostgreSQL Neon, and Framer Motion. The platform includes an admin control dashboard where admins can easily update the landing page, upload posts, manage images, and control website content.",
          technologies: [
            "Next.js",
            "TypeScript",
            "Prisma ORM",
            "PostgreSQL",
            "Neon",
            "Framer Motion",
          ],
          keyFeatures: [
            "Dynamic landing page",
            "Admin control dashboard",
            "Post and image management",
            "Frontend and backend integration",
          ],
          links: [
            {
              name: "Main Website",
              url: "https://aersospacemain-1.onrender.com",
            },
            {
              name: "Admin Login",
              url: "https://aersospace-6.onrender.com/login",
            },
          ],
        },

        {
          name: "Heritage Hub - Ethiopian History Preservation System",
          image: "/project-heritage-hub.png",
          link: "https://finalhub.onrender.com/",
          role: "Full Stack Developer",
          smallDescription:
            "A digital archive system designed to document and preserve Ethiopian historical artifacts, documents, and cultural heritage. The platform includes advanced search, multimedia galleries, educational resources, and dashboards for multiple user types.",
          technologies: [
            "Next.js",
            "TypeScript",
            "Prisma ORM",
            "PostgreSQL",
          ],
          keyFeatures: [
            "Historical artifact archive",
            "Advanced search system",
            "Multimedia galleries",
            "Educational resources",
            "Premium, researcher, and public user dashboards",
            "Company admin, uploader, and reviewer dashboards",
            "Platform super admin control",
          ],
          links: [
            {
              name: "View Project",
              url: "https://finalhub.onrender.com/",
            },
          ],
        },

        {
          name: "Dear Lottery Management Platform",
          image: "/project-lottery.png",
          link: "https://lottery-2-eight.vercel.app",
          role: "Full Stack Developer",
          smallDescription:
            "A web-based management platform upgraded for Dear Lottery operations. The system includes secure ticket scanning, historical result archives, automated daily draw verification, and real-time financial tracking for administrators.",
          technologies: ["Next.js", "Tailwind CSS"],
          keyFeatures: [
            "Secure ticket scanning",
            "Historical result archive",
            "Automated daily draw verification",
            "Real-time financial tracking",
            "Responsive admin interface",
          ],
          links: [
            {
              name: "View Project",
              url: "https://lottery-2-eight.vercel.app",
            },
          ],
        },
      ],
    },

    {
      tabName: "AI / Learning",
      projects: [
        {
          name: "Amharic Learning Platform",
          image: "/project-amharic-learning.png",
          link: "https://mesa-amharic-learning-app.vercel.app",
          role: "Full Stack Developer",
          smallDescription:
            "An interactive Amharic learning platform that helps users learn Ethiopian letters, also known as Fidel, through writing practice, listening, and AI-powered pronunciation support.",
          technologies: ["Next.js", "Python", "AI"],
          keyFeatures: [
            "Amharic Fidel learning",
            "Writing practice",
            "Audio-based learning",
            "AI pronunciation practice",
            "Beginner-friendly self-learning flow",
          ],
          links: [
            {
              name: "View Project",
              url: "https://mesa-amharic-learning-app.vercel.app",
            },
          ],
        },
      ],
    },

    {
      tabName: "Backend Systems",
      projects: [
        {
          name: "Lemi Kura Reporting System",
          image: "/project-lemi-kura.png",
          link: "https://reporting.lemikurapp.org",
          role: "Backend / Full Stack Developer",
          smallDescription:
            "A secure reporting system for Lemi Kura Subcity with verifiable submissions, timestamped data, audit trails, and real-time admin monitoring.",
          technologies: [
            "Node.js",
            "Express.js",
            "React.js",
            "MySQL",
            "Sequelize",
          ],
          keyFeatures: [
            "Secure reporting",
            "Verifiable submissions",
            "Timestamped data",
            "Audit trails",
            "Real-time admin monitoring",
          ],
          links: [
            {
              name: "View Project",
              url: "https://reporting.lemikurapp.org",
            },
          ],
        },
      ],
    },

    {
      tabName: "Web & Mobile",
      projects: [
        {
          name: "Moteregna Delivery System",
          image: "/project-moteregna.png",
          link: "https://moteregna-slpo.vercel.app",
          role: "Full Stack Developer",
          smallDescription:
            "A cross-platform delivery coordination system supporting both web and mobile interfaces. I participated as a full-stack developer on the web admin control system and also contributed to the backend side of the mobile application.",
          technologies: [
            "Next.js",
            "Tailwind CSS",
            "TypeScript",
            "Flutter",
            "PostgreSQL",
          ],
          keyFeatures: [
            "Real-time delivery tracking",
            "Super Admin dashboard",
            "Admin dashboard",
            "Motorist dashboard",
            "Web and mobile support",
            "Backend integration for mobile app",
          ],
          links: [
            {
              name: "View Project",
              url: "https://moteregna-slpo.vercel.app",
            },
          ],
        },
      ],
    },

    {
      tabName: "Frontend",
      projects: [
        {
          name: "Development for Peace Organization Website",
          image: "/project-dev-for-peace.png",
          link: "https://devforpeace.org",
          role: "Frontend Developer",
          smallDescription:
            "A multilingual and user-friendly organization website built to communicate the mission of Development for Peace and showcase global projects.",
          technologies: ["React.js", "Tailwind CSS", "Framer Motion"],
          keyFeatures: [
            "Responsive UI",
            "Accessible design",
            "Lightweight CMS integration",
            "Multilingual support",
            "Project showcase pages",
          ],
          links: [
            {
              name: "View Project",
              url: "https://devforpeace.org",
            },
          ],
        },

        {
          name: "Gibe Market - E-Commerce Platform",
          image: "/project-gibe-market.png",
          link: "#",
          role: "Frontend Developer",
          smallDescription:
            "An online marketplace that enables suppliers to showcase and sell products directly to customers through intuitive dashboards and product management tools.",
          technologies: [
            "Next.js",
            "Tailwind CSS",
            "Material UI",
            "TypeScript",
          ],
          keyFeatures: [
            "Supplier dashboard",
            "Product management",
            "Order tracking",
            "E-commerce UI",
            "Responsive marketplace design",
          ],
          links: [
            {
              name: "View Project",
              url: "#",
            },
          ],
        },
      ],
    },
  ],
},

workExperience: {
  headline: "Work Experience",
  smallDescription: "Companies and teams I have worked with.",
  buttonName: "View Resume",
  buttonLink: "/resume.pdf",
  companies: [
    {
      name: "Afritech",
      role: "Full Stack Developer",
      smallTextDescription:
        "Developed diverse full-stack solutions including hotel management systems, pharmacy management platforms, e-commerce websites, and company websites. Built responsive interfaces, backend APIs, and database-driven applications.",
      startDate: "2024",
      endDate: "2025",
    },
    {
      name: "Crosslight Africa",
      role: "Frontend Developer",
      smallTextDescription:
        "Focused on building interactive and responsive user interfaces using Next.js, Tailwind CSS, and TypeScript. Designed and developed an educational platform for structured learning resources.",
      startDate: "2023",
      endDate: "2025",
    },
    {
      name: "Bright Technology",
      role: "Full Stack Developer",
      smallTextDescription:
        "Worked as a full stack developer delivering end-to-end solutions across various projects, handling both frontend interfaces and backend infrastructure.",
      startDate: "2024",
      endDate: "current",
    },
    {
      name: "Freelance",
      role: "Full Stack Developer",
      smallTextDescription:
        "Worked with private clients on multiple full-stack projects for over a year, participating in both frontend and backend development. Delivered tailored solutions across various domains.",
      startDate: "2023",
      endDate: "current",
    },
    {
      name: "Gumisofts",
      role: "Frontend Developer",
      smallTextDescription:
        "Contributed to the development of e-commerce websites, building responsive and user-friendly interfaces to enhance shopping experiences.",
      startDate: "2025",
      endDate: "2025",
    },
  ],
},

  contact: {
    description:
      "Feel free to contact me for work, projects, or collaboration.",
    education: [
      {
        schoolName: "Hope Enterprsie Univertiy Collage",
        degree: "BSc",
        fieldOfStudy: "Computer Science",
        startDate: "2021",
        endDate: "2025",
      },
    ],
    phone: "+251975336956",
    email: "mesiori21@gmail.com",
       socialMedia: [
      {
        name: "LinkedIn",
        icon: "linkedin",
        link: "https://linkedin.com",
      },
      {
        name: "GitHub",
        icon: "github",
        link: "https://github.com",
      },
       {
        name: "instagram",
        icon: "instagram",
        link: "https://instagram.com",
      },
       {
        name: "telegram",
        icon: "telegram",
        link: "https://telegram.com",
      },
      {
        name: "facebook",
        icon: "facebook",
        link: "https://facebook.com",
      },
    ],
    contactForm: {
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          placeholder: "Write your message",
          required: true,
        },
      ],
      buttonName: "Send Message",
    },
  },

  footer: {
    name: "Meseret Shumet",
    socialMedia: [
      {
        name: "LinkedIn",
        icon: "linkedin",
        link: "https://linkedin.com",
      },
      {
        name: "GitHub",
        icon: "github",
        link: "https://github.com",
      },
       {
        name: "instagram",
        icon: "instagram",
        link: "https://instagram.com",
      },
       {
        name: "telegram",
        icon: "telegram",
        link: "https://telegram.com",
      },
      {
        name: "facebook",
        icon: "facebook",
        link: "https://facebook.com",
      },
    ],
    copyrightText: "© 2026 Meseret Shumet. All rights reserved.",
  },
};