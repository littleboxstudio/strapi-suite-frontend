"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/app/core/contexts/locale";

export default function Header() {
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState<string>(locale.current);

  useEffect(() => {
    setCurrentLocale(locale.current);
  }, [locale.current]);

  return (
    <ul className="flex justify-end gap-2 w-full">
      {locale.get().map((item) => (
        <li key={item}>
          <a
            onClick={() => locale.set(item)}
            className={`
              flex justify-center items-center cursor-pointer uppercase text-[14px] px-[10px] h-[40px] rounded-[10px] border border-solid border-white/[.145] transition-colors hover:bg-[#1a1a1a] hover:border-transparent text-[#b5b5b5]
              ${currentLocale === item ? "bg-[#1a1a1a] !border-transparent text-[#fff]" : ""}
            `}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
