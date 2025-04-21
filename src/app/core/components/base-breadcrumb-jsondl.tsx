import { Page } from "@/app/core/types";

export default function BaseBreadcrumbJsonLd(props: { page: Page }) {
  const breadcrumbList = props.page.document.breadcrumbs.map((crumb) => ({
    "@type": "ListItem",
    position: crumb.position,
    item: {
      "@id": `${process.env.SITE_URL}/${crumb.item}`,
      name: crumb.name,
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
