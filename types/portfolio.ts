export interface BrandColors {
  primary: string;
  secondary: string;
  background?: string;
  text?: string;
}

export interface PlatformInfo {
  name: string;
  logo: string;
  brandColors: BrandColors;
}

export interface ProjectLink {
  name: string;
  url: string;
}

export interface ProjectItem {
  name: string;
  image: string;
  link: string;
  smallDescription: string;
  role?: string;
  technologies?: string[];
  keyFeatures?: string[];
  links?: ProjectLink[];
}

export interface ProjectTab {
  tabName: string;
  projects: ProjectItem[];
}

export interface ProjectsSection {
  title: string;
  description?: string;
  tabs: ProjectTab[];
}
export interface NavbarMenuItem {
  name: string;
  link: string;
}

export interface NavbarSection {
  logo: string;
  menuItems: NavbarMenuItem[];
  buttonName: string;
  buttonLink: string;
}

export interface SocialMediaLink {
  name: string;
  icon: string;
  link: string;
}

export interface HeroSection {
  name: string;
  title: string;
  description: string;
  buttonName: string;
  buttonLink: string;
  imageUrl?: string;
  socialMedia: SocialMediaLink[];
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface AboutMeSection {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  name: string;
  image: string;
  link: string;
  smallDescription: string;
}

export interface ProjectTab {
  tabName: string;
  projects: ProjectItem[];
}

export interface ProjectsSection {
  title: string;
  description?: string;
  tabs: ProjectTab[];
}

export interface CompanyExperience {
  name: string;
  smallTextDescription: string;
  startDate?: string;
  endDate?: string;
  role?: string;
}

export interface WorkExperienceSection {
  headline: string;
  smallDescription: string;
  buttonName: string;
  buttonLink: string;
  companies: CompanyExperience[];
}

export interface EducationItem {
  schoolName: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
}

export interface ContactSection {
  description: string;
  education: EducationItem[];
  phone: string;
  email: string;
  socialMedia: SocialMediaLink[];
  contactForm: {
    fields: ContactFormField[];
    buttonName: string;
  };
}

export interface FooterSection {
  name: string;
  socialMedia: SocialMediaLink[];
  copyrightText?: string;
}

export interface PortfolioWebsiteContent {
  platform: PlatformInfo;
  navbar: NavbarSection;
  heroSection: HeroSection;
  aboutMe: AboutMeSection;
  projects: ProjectsSection;
  workExperience: WorkExperienceSection;
  contact: ContactSection;
  footer: FooterSection;
}