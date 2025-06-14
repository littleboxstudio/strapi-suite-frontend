import { cache } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Page, Pages, Parameter } from "@/app/core/types";
import { metaDataGenerator } from "@/app/core/lib/metaDataGenerator";
import BaseTemplate from "@/app/core/components/base-template";
import BaseBreadcrumbJsonLd from "@/app/core/components/base-breadcrumb-jsonld";
import BaseJsonLd from "@/app/core/components/base-jsonld";

export const revalidate = 1;
export const dynamicParams = true;

type TemplateProps = {
  page: Page;
};

const headers: RequestInit = {
  next: { revalidate: Number(process.env.REQUEST_REVALIDATE) },
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    "Content-Type": "application/json",
  },
};

const getPage = cache(async (slug: string) => {
  const page = await fetch(
    `${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/pages?slug=${slug}&properties=attributes`,
    headers
  );
  return page.json();
});

const getParameters = cache(async () => {
  const page = await fetch(`${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/parameters`, headers);
  return page.json();
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page: Page = await getPage(slug.join("/"));
  const parameters: Parameter[] = await getParameters();
  return metaDataGenerator(page, parameters);
}

export async function generateStaticParams() {
  const pages: Pages[] = await fetch(
    `${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/pages`,
    headers
  ).then((res) => res.json());
  return pages
    .filter((page) => page.slug !== "")
    .map((page) => ({
      slug: page.slug.split("/"),
    }));
}

export default async function Index({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  let page: Page;
  try {
    page = await getPage(slug.join("/"));
  } catch {
    notFound();
  }
  try {
    const content = await import(`../../templates/${page.attributes.template}/content.ts`);
    const strategy = content.default;
    await strategy(page);
  } catch {}
  const Template = dynamic<TemplateProps>(() =>
    import(`../../templates/${page.attributes.template}`).then((mod) => mod.default)
  );
  return (
    <BaseTemplate page={page}>
      <Template page={page} />
      <BaseBreadcrumbJsonLd page={page} />
      <BaseJsonLd page={page} />
    </BaseTemplate>
  );
}
