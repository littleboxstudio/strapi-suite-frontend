import { Page } from "@/app/core/types";

export default function BaseJsonLd(props: { page: Page }) {
  if (!props.page.document.seo.structuredData) return <></>;
  const jsonLd = props.page.document.seo.structuredData;
  if (jsonLd.name === "[META_TITLE]") jsonLd.name = props.page.document.seo.metaTitle;
  if (jsonLd.description === "[META_DESCRIPTION]") jsonLd.description = props.page.document.seo.metaDescription;
  if (jsonLd.url === "[CANONICAL_URL]") jsonLd.url = props.page.document.seo.canonicalURL;
  if (jsonLd.image === "[META_IMAGE]")
    jsonLd.image = `${process.env.NEXT_PUBLIC_STATIC_URL}${props.page.document.seo.metaImage?.url}`;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
