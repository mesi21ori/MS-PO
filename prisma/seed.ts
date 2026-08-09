import { PrismaClient } from "@prisma/client";
import { portfolioContent } from "../lib/portfolioContent";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function seedSiteContent() {
  const existing = await prisma.siteSettings.findUnique({
    where: { id: "main" },
  });

  if (existing) {
    console.log("Skipping site content seed: already exists.");
    return;
  }

  await prisma.siteSettings.create({
    data: {
      id: "main",
      data: {
        platform: portfolioContent.platform,
        navbar: portfolioContent.navbar,
        heroSection: portfolioContent.heroSection,
        aboutMe: portfolioContent.aboutMe,
        projects: {
          title: portfolioContent.projects.title,
          description: portfolioContent.projects.description,
        },
        workExperience: portfolioContent.workExperience,
        contact: portfolioContent.contact,
        footer: portfolioContent.footer,
      },
    },
  });

  console.log("Seeded site content.");
}

async function seedProjects() {
  const existing = await prisma.project.count();
  if (existing > 0) {
    console.log(`Skipping project seed: ${existing} projects already exist.`);
    return;
  }

  let sortOrder = 0;

  for (const tab of portfolioContent.projects.tabs) {
    for (const project of tab.projects) {
      const baseSlug = slugify(project.name);
      let slug = baseSlug;
      let attempt = 1;

      while (await prisma.project.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${attempt++}`;
      }

      await prisma.project.create({
        data: {
          name: project.name,
          slug,
          category: tab.tabName,
          image: project.image || "",
          link: project.link || "#",
          role: project.role ?? null,
          smallDescription: project.smallDescription,
          technologies: JSON.stringify(project.technologies ?? []),
          keyFeatures: JSON.stringify(project.keyFeatures ?? []),
          links: JSON.stringify(project.links ?? []),
          published: true,
          sortOrder: sortOrder++,
        },
      });
    }
  }

  console.log(`Seeded ${sortOrder} projects.`);
}

async function main() {
  await seedSiteContent();
  await seedProjects();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
