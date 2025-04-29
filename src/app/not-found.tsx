"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Roboto } from "next/font/google";
import Header from "@/app/components/header";
import { useLocale } from "@/app/core/contexts/locale";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  const locale = useLocale();
  const [homepageLink, setHomepageLink] = useState<string>("");

  useEffect(() => {
    const homepageLink = locale.getHomepageLink(locale.current);
    setHomepageLink(homepageLink);
  }, [locale]);

  return (
    <div className={`${roboto.className} w-full min-h-screen flex flex-col bg-radial from-[#373737] to-[#0a0a0a]`}>
      <div className="w-full pt-[40px] pr-[40px] flex">
        <Header />
      </div>
      <div className="w-full flex flex-col flex-1 justify-center items-center">
        <p className="pt-[20px] text-[60px] font-bold">404</p>
        <p className="text-[20px]">This page is an example of a page not found.</p>
        <div className="flex gap-4 items-center flex-row pt-[40px]">
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href={homepageLink}
            rel="noopener noreferrer"
          >
            Back to home
          </Link>
        </div>
      </div>
      <div className="w-full pb-[40px]">
        <a
          className="flex justify-center items-center"
          href="https://github.com/littleboxstudio/strapi-frontend"
          target="_blank"
        >
          <Image src="/github.svg" alt="Littlebox Strapi Suite Github" width={24} height={24} />
          <span className="pl-[10px]">Github</span>
        </a>
      </div>
    </div>
  );
}
