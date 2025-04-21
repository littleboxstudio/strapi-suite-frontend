export interface Pages {
  id: number;
  documentId: string;
  slug: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  localizations: Pages[];
}

export interface Page {
  document: {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    [key: string]: unknown;
    localizations: PageLocalization[];
    seo: PageSeo;
    breadcrumbs: PageBreadcrumbs[];
  };
  attributes: {
    template: string;
    priority: string;
    frequency: string;
    parent?: {
      id: string;
      model: string;
    };
  };
}

export interface PageLocalization {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface PageBreadcrumbs { 
  position: number;
  item: string;
  name: string;
}

export type OgType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

export interface PageSeo {
  authors: { name: string; url: string }[];
  canonicalURL: string;
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  openGraph?: {
    ogDescription: string;
    ogImage: string;
    ogTitle: string;
    ogType: OgType;
    ogUrl: string;
  };
  robots: {
    follow: boolean;
    index: boolean;
    nocache: boolean;
    noimageindex: boolean;
  };
}

export interface Parameter {
  uid: string;
  value: string;
}

export interface Menu {
  id: number;
  documentId: string;
  title: string;
  uid: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  children: MenuChildren[];
}

export interface MenuChildren {
  id: number;
  documentId: string;
  menuId: string;
  parentId: string;
  title: string;
  url: string;
  target: string;
  order: number;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  children: MenuChildren[];
}

export interface Locales {
  locales: string[];
  default: string;
}
