import { prisma } from "@/lib/prisma";
import { portfolioContent } from "@/lib/portfolioContent";
import type { PortfolioWebsiteContent } from "@/types/portfolio";

export type SiteContent = Omit<PortfolioWebsiteContent, "projects"> & {
  projects: {
    title: string;
    description?: string;
  };
};

function toSiteContent(
  content: PortfolioWebsiteContent | SiteContent
): SiteContent {
  return {
    platform: content.platform,
    navbar: content.navbar,
    heroSection: content.heroSection,
    aboutMe: content.aboutMe,
    projects: {
      title: content.projects.title,
      description: content.projects.description,
    },
    workExperience: content.workExperience,
    contact: content.contact,
    footer: content.footer,
  };
}

export const defaultSiteContent: SiteContent = toSiteContent(portfolioContent);

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    if (!settings?.data) {
      return defaultSiteContent;
    }

    const stored = settings.data as SiteContent;
    return {
      ...defaultSiteContent,
      ...stored,
      platform: {
        ...defaultSiteContent.platform,
        ...stored.platform,
        brandColors: {
          ...defaultSiteContent.platform.brandColors,
          ...stored.platform?.brandColors,
        },
      },
      navbar: { ...defaultSiteContent.navbar, ...stored.navbar },
      heroSection: { ...defaultSiteContent.heroSection, ...stored.heroSection },
      aboutMe: { ...defaultSiteContent.aboutMe, ...stored.aboutMe },
      projects: { ...defaultSiteContent.projects, ...stored.projects },
      workExperience: {
        ...defaultSiteContent.workExperience,
        ...stored.workExperience,
      },
      contact: { ...defaultSiteContent.contact, ...stored.contact },
      footer: { ...defaultSiteContent.footer, ...stored.footer },
    };
  } catch (error) {
    console.error("Failed to load site content:", error);
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  const normalized = toSiteContent(content);

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      data: normalized,
    },
    update: {
      data: normalized,
    },
  });

  return normalized;
}

export async function ensureSiteContentSeeded() {
  const existing = await prisma.siteSettings.findUnique({
    where: { id: "main" },
  });

  if (!existing) {
    await saveSiteContent(defaultSiteContent);
  }
}
