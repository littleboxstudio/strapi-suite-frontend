import { cache } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Page, Parameter } from "@/app/core/types";
import { metaDataGenerator } from "@/app/core/lib/metaDataGenerator";
import BaseTemplate from "@/app/core/components/base-template";
import BaseBreadcrumbJsonLd from "@/app/core/components/base-breadcrumb-jsondl";

export const revalidate = Number(process.env.REQUEST_REVALIDATE);
export const dynamicParams = true;
export const headers: RequestInit = {
  next: { revalidate },
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    "Content-Type": "application/json",
  },
};

type TemplateProps = {
  page: Page;
};

export const getHomePage = cache(async () => {
  const page = await fetch(
    `${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/pages/home?properties=attributes`,
    headers
  );
  return page.json();
});

export const getParameters = cache(async () => {
  const page = await fetch(`${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/parameters`, headers);
  return page.json();
});

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await getHomePage();
  const parameters: Parameter[] = await getParameters();
  return metaDataGenerator(page, parameters);
}

export default async function Index() {
  let page: Page;
  try {
    page = await getHomePage();
  } catch {
    notFound();
  }
  try {
    const content = await import(`./templates/${page.attributes.template}/content.ts`);
    const strategy = content.default;
    await strategy(page);
  } catch {}
  const Template = dynamic<TemplateProps>(() =>
    import(`./templates/${page.attributes.template}`).then((mod) => mod.default)
  );
  return (
    <BaseTemplate page={page}>
      <Template page={page} />
      <BaseBreadcrumbJsonLd page={page} />
    </BaseTemplate>
  );
}
