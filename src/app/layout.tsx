import { cache } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import BaseLayout from "@/app/core/components/base-layout";
import { Page, PageLocalization } from "@/app/core/types";
import { ParameterProvider } from "@/app/core/contexts/parameter";
import { LocaleProvider } from "@/app/core/contexts/locale";
import { MenuProvider } from "@/app/core/contexts/menu";
import "./globals.css";

export const revalidate = Number(process.env.REQUEST_REVALIDATE);
export const headers: RequestInit = {
  next: { revalidate },
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    "Content-Type": "application/json",
  },
};

export const getMenus = cache(async (locale: string) => {
  const page = await fetch(
    `${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/menus?locale=${locale}`,
    headers
  );
  return page.json();
});

export const getParameters = cache(async () => {
  const page = await fetch(`${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/parameters`, headers);
  return page.json();
});

export const getLocales = cache(async () => {
  const page = await fetch(`${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/locales`, headers);
  return page.json();
});

export const getHomepage = cache(async () => {
  const page = await fetch(`${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/pages/home`, headers);
  return page.json();
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const menus = await getMenus(locale);
  const parameters = await getParameters();
  const locales = await getLocales();
  const homepage: Page = await getHomepage();
  const fallback = { [homepage.document.locale.toLowerCase()]: `/${homepage.document.slug}` };
  homepage.document.localizations.forEach((localization: PageLocalization) => {
    fallback[localization.locale.toLowerCase()] = `/${localization.slug}`;
  });
  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <ParameterProvider data={parameters}>
            <MenuProvider data={menus}>
              <LocaleProvider data={locales} fallback={fallback} current={locale}>
                <BaseLayout>{children}</BaseLayout>
              </LocaleProvider>
            </MenuProvider>
          </ParameterProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
