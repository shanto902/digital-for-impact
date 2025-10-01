import {
  TAboutImage,
  TClient,
  THomeVideo,
  TNavItem,
  TServiceItem,
  TTeamMember,
} from "@/types";
import "./html";
export const navItems: TNavItem[] = [
  {
    name: "About Us",
    link: "#about",
  },
  {
    name: "Our Work",
    link: "#portfolio",
  },
  {
    name: "Team",
    link: "#team",
  },
];

export const homeVideos: THomeVideo[] = [
  {
    src: "/videos/Video1.mp4",
    poster: "/images/Video1.jpg",
    label: "Showroom",
  },
  {
    src: "/videos/Video2.mp4",
    poster: "/images/Video2.jpg",
    label: "Products",
  },
  {
    src: "/videos/Video3.mp4",
    poster: "/images/Video3.jpg",
    label: "Installations",
  },
];

export const heroText: string = "Digital Disruption Delivered";

export const aboutImages: TAboutImage[] = [
  {
    alt: "About Image 1",
    src: "/images/about-1.jpg",
  },
  {
    alt: "About Image 4",
    src: "/images/about-4.jpg",
  },
];

export const aboutTitle: string = "Digital for ";

export const aboutShuffleWords: string[] = [
  "Impact",
  "Tourism",
  "Hospitality",
  "Food & Beverage",
  " Social Enterprise",
  "Activations",
  "Events",
  "Technology",
  "Consumer Goods",
  "Financial Services",
  "Retail Services",
  "Education",
];

export const aboutButtonText: string = "Schedule a call with us today!";

export const clientCompanies: TClient[] = [
  {
    src: "/images/client-01.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/images/client-02.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/images/client-03.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-04.png",
    alt: "Company 4",
    href: "https://company4.com",
  },
  {
    src: "/images/client-05.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-06.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-07.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-08.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-09.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-10.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-11.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-12.jpg",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-13.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-14.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];

export const services: TServiceItem[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing & Content Creation",
    description:
      "From SEO and paid campaigns to engaging social media and blog content—we craft strategies that connect with your audience and deliver measurable growth.",
    image: "/images/digital-marketing.webp",
    gradient: "bg-gradient-to-r from-green-800 to-green-600",
    gridSpan: "col-span-1 lg:col-span-2",
    minHeight: "min-h-[500px] lg:min-h-[300px]",
    imageClass:
      "absolute -right-4 lg:-right-[20%] -bottom-2 object-contain rounded-2xl",
  },
  {
    id: "branding",
    title: "Branding & Creatives",
    description:
      "Build a powerful identity. We design logos, brand guidelines, and visuals that make your brand unforgettable across every channel.",
    image: "/images/branding.jpg",
    gradient: "bg-gradient-to-r from-purple-700 to-pink-500",
    gridSpan: "col-span-1",
    minHeight: "min-h-[300px]",
  },
  {
    id: "production",
    title: "Production & Photography",
    description:
      "Capture your story with professional photography and video production. High-quality visuals that inspire, engage, and convert.",
    image: "/images/production.jpg",
    gradient: "bg-gradient-to-r from-amber-600 to-yellow-500",
    gridSpan: "col-span-1",
    minHeight: "min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]",
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    description:
      "Modern, responsive, and user-friendly websites tailored to your business needs. From eCommerce to corporate sites—we design for performance and impact.",
    image: "/images/web-design.jpg",
    gradient: "bg-gradient-to-r from-cyan-600 to-emerald-500",
    gridSpan: "col-span-1 lg:col-span-2",
    minHeight: "min-h-[400px] lg:min-h-[300px]",
    imageClass:
      "absolute -right-4 md:-right-[20%] -bottom-8 object-contain rounded-2xl",
  },
];

export const teamMembers: TTeamMember[] = [
  {
    name: "Murtaza Shujauddin",
    role: "Managing Director",
    img: "/images/team1.png",
  },
  {
    name: "Kazi Tahmid Imam",
    role: "Partner, APAC",
    img: "/images/team2.png",
  },
  {
    name: "Syed Ahsan Rahat",
    role: "Director",
    img: "/images/team3.png",
  },
  {
    name: "Ziaus Shams",
    role: "Partner, Production",
    img: "/images/team4.png",
  },
];

export const teamTitle: string = "Meet our board members";
export const teamDescription: string =
  "A diverse group of passionate professionals, each bringing unique skills and experiences to drive innovation and excellence in every project we undertake.";
