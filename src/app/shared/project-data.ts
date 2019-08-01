interface ProjectImage {
  src: string;
  alt: string;
};

export interface ProjectData {
  id: number;
  title: string;
  category: string[];
  github: string;
  altLink: string;
  technology: string[];
  description: string;
  linkHelpText: string;
  preview: ProjectImage;
  additionalImages: ProjectImage[];
};
