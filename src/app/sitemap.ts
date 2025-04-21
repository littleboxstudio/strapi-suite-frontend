import type { MetadataRoute } from 'next';
import { Pages } from '@/app/core/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: Pages[] = await fetch(`${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/pages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
  }).then((res) => res.json());
  const mappedPages = pages.map((item: Pages) => {
    const languages: { [key: string]: string } = {};
    item.localizations.forEach(localization => {
      const localeKey = localization.locale.toLowerCase();
      languages[localeKey] = localization.slug;
    });
    return {
      url: `${process.env.SITE_URL}/${item.slug}`,
      lastModified: item.updatedAt,
      alternates: {
        languages
      }
    };
  });
  return mappedPages;
}