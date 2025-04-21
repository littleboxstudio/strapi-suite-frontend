"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState(Cookies.get("NEXT_LOCALE"));
  const [previousLocale, setPreviousLocale] = useState(Cookies.get("NEXT_LOCALE"));
  useEffect(() => {
    const cookieLocale = Cookies.get("NEXT_LOCALE");
    setCurrentLocale(cookieLocale);
  }, [pathname]);
  useEffect(() => {
    if (previousLocale !== currentLocale) {
      router.refresh();
      setPreviousLocale(currentLocale);
      return;
    }
  }, [currentLocale]);
  return <>{children}</>;
}
