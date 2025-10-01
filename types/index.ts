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
