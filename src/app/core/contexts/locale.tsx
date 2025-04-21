"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Locales } from "@/app/core/types";

type AuthProviderProps = {
  children: ReactNode;
  data: Locales;
  fallback: Record<string, string>;
  current: string;
};

type LocaleContextData = {
  set(locale: string): void;
  setLocalizations(localizations: Record<string, string>): void;
  get(): string[];
  getHomepageLink(locale: string): string;
  default: string;
  current: string;
};

export function LocaleProvider({ children, data, fallback, current }: AuthProviderProps) {
  const router = useRouter();
  const [currentLocalizations, setCurrentLocalizations] = useState<Record<string, string>>({});
  const [currentLocale, setCurrentLocale] = useState<string>(current);
  function set(locale: string): void {
    const nextPath = currentLocalizations[locale] || fallback[locale];
    if (!nextPath) {
      throw new Error("Redirect failed: there is no page in the selected language");
    }
    setCurrentLocale(locale);
    router.push(nextPath);
  }
  function setLocalizations(localizations: Record<string, string>): void {
    setCurrentLocalizations(localizations);
  }
  function get(): string[] {
    return data.locales;
  }
  function getHomepageLink(locale: string): string {
    const homepagePath = fallback[locale];
    if (!homepagePath) {
      throw new Error(`There is no homepage for the locale "${locale}"`);
    }
    return homepagePath;
  }
  return (
    <LocaleContext.Provider
      value={{
        set,
        setLocalizations,
        get,
        getHomepageLink,
        default: data.default,
        current: currentLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export const LocaleContext = createContext({} as LocaleContextData);
export function useLocale() {
  return useContext(LocaleContext);
}
