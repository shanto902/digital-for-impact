import { ReactNode } from "react";

export type TNavItem = {
  name: string;
  link: string;
};

export type THomeVideo = {
  src: string;
  poster: string;
  label: string;
};

export type TAboutImage = {
  src: string;
  alt: string;
};

export type TClient = {
  src: string;
  alt: string;
  href: string;
};

export type TServiceItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  gradient?: string;
  gridSpan?: string;
  minHeight?: string;
  imageClass?: string;
};

export type TTeamMember = {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
};

export type TBrandItem = {
  id: string;
  src: string; // image path
  href: string; // link
  title?: string;
};

export type TStaticContent = {
  id: string;
  img: string;
  url: string;
};

export type TVideoItem = {
  id: string;
  src: string;
  poster?: string;
  title?: string;
};

export type TWebsiteTab = {
  id: string;
  title: string;
  poster: string;
  longShot: string;
  url?: string;
};

export type TActivationsTab = {
  id: string;
  img: string;
  url: string;
};

/** TYPES */
export type TCaseItem = {
  title: string;
  src: string;
  content?: string;
};
