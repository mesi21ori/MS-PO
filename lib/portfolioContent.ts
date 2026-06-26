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
    description: "Some of my recent works.",
    tabs: [
      {
        tabName: "Full Stack",
        projects: [
          {
            name: "Portfolio Website",
            image: "/project-1.png",
            link: "https://example.com",
            smallDescription: "A modern personal portfolio website.",
          },
        ],
      },
      {
        tabName: "Frontend",
        projects: [
          {
            name: "Dashboard UI",
            image: "/project-2.png",
            link: "https://example.com",
            smallDescription: "A clean dashboard interface design.",
          },
        ],
      },
      {
        tabName: "Backend",
        projects: [
          {
            name: "API Management System",
            image: "/project-3.png",
            link: "https://example.com",
            smallDescription:
              "A backend system built with secure APIs, database models, and server-side logic.",
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
        name: "ABC Tech",
        role: "Full Stack Developer",
        smallTextDescription:
          "Built responsive interfaces, backend APIs, and database-driven web applications using React, Next.js, Node.js, and TypeScript.",
        startDate: "2023",
        endDate: "2024",
      },
       {
        name: "mesi Tech",
        role: "Full Stack Developer",
        smallTextDescription:
          "Built responsive interfaces, backend APIs, and database-driven web applications using React, Next.js, Node.js, and TypeScript.",
        startDate: "2023",
        endDate: "2024",
      },
    ],
  },

  contact: {
    description:
      "Feel free to contact me for work, projects, or collaboration.",
    education: [
      {
        schoolName: "ABC University",
        degree: "BSc",
        fieldOfStudy: "Computer Science",
        startDate: "2020",
        endDate: "2024",
      },
    ],
    phone: "+251900000000",
    email: "example@gmail.com",
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
    ],
    copyrightText: "© 2026 Meseret Shumet. All rights reserved.",
  },
};