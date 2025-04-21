"use client";

import { useEffect } from "react";
import { Page, PageLocalization } from "@/app/core/types";
import { useLocale } from "@/app/core/contexts/locale";

export default function BaseTemplate({
  page,
  children,
}: Readonly<{
  page: Page;
  children: React.ReactNode;
}>) {
  const locale = useLocale();
  useEffect(() => {
    const localizations = { [page.document.locale.toLowerCase()]: `/${page.document.slug}` };
    page.document.localizations.forEach((localization: PageLocalization) => {
      localizations[localization.locale.toLowerCase()] = `/${localization.slug}`;
    });
    locale.setLocalizations(localizations);
  }, [page]);
  return <>{children}</>;
}
