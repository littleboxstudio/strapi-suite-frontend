import { Metadata } from "next";
import { Page, PageSeo, PageLocalization, Parameter } from "@/app/core/types";

function getGoogleVerification(parameters: Parameter[]) {
  const parameter = parameters.find((p) => p.uid === "google-site-verification");
  return parameter;
}

export function metaDataGenerator(page: Page, parameters: Parameter[]): Metadata {
  if (!page.document.seo) return {};
  const seo: PageSeo = page.document.seo;
  const metaData: any = {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    authors: seo?.authors,
    keywords: seo?.keywords,
    twitter: {
      card: "summary_large_image",
      title: seo?.openGraph?.ogTitle,
      description: seo?.openGraph?.ogDescription,
      images: [seo?.openGraph?.ogImage],
    },
    robots: {
      index: seo?.robots?.index,
      follow: seo?.robots?.follow,
      nocache: seo?.robots?.nocache,
      googleBot: {
        index: seo?.robots?.index,
        follow: seo?.robots?.follow,
        noimageindex: seo?.robots?.noimageindex,
      },
    },
    alternates: {
      canonical: `${process.env.SITE_URL}/${page.document.slug}`,
      languages: {},
    },
    verification: {},
  };
  if (seo.openGraph) {
    metaData.openGraph = {
      title: seo?.openGraph?.ogTitle,
      description: seo?.openGraph?.ogUrl,
      url: seo?.openGraph?.ogUrl,
      images: [
        {
          url: seo?.openGraph?.ogImage,
        },
      ],
      locale: page.document.locale,
      type: seo?.openGraph?.ogType,
    };
  }
  const googleSiteVerification = getGoogleVerification(parameters);
  if (googleSiteVerification) {
    metaData.verification.google = googleSiteVerification.value;
  }
  page.document.localizations.forEach((localization: PageLocalization) => {
    metaData.alternates.languages[localization.locale] = `${process.env.SITE_URL}/${localization.slug}`;
  });
  return metaData;
}
