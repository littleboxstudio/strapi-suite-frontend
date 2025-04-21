"use client";

import Image from "next/image";
import { Roboto } from "next/font/google";
import Header from "@/app/components/header";
import { Page } from "@/app/core/types";
interface Props {
  page: Page;
}

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Default({ page }: Props) {
  return (
    <div className={`${roboto.className} w-full min-h-screen flex flex-col bg-radial from-[#373737] to-[#0a0a0a]`}>
      <div className="w-full pt-[40px] pr-[40px] flex">
        <Header />
      </div>
      <div className="w-full flex flex-col flex-1 justify-center items-center">
        <svg width="177" height="56" viewBox="0 0 177 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M110.228 13.1898C108.131 13.2096 106.164 13.7793 104.463 14.7641V2.76147H98.5296V43.9595C98.5296 50.4688 103.679 55.9029 110.162 55.9984C116.755 56.0955 122.149 50.7405 122.149 44.1456V25.2303C122.149 18.6486 116.784 13.1289 110.228 13.1898ZM116.214 44.1456C116.214 47.4554 113.484 50.1362 110.167 50.0407C106.968 49.9485 104.463 47.2265 104.463 44.0139V25.0442C104.463 21.7344 107.193 19.0536 110.51 19.1491C113.709 19.2414 116.214 21.9633 116.214 25.176V44.1456ZM139.032 13.1898C132.549 13.2853 127.4 18.721 127.4 25.2287V43.9579C127.4 50.4672 132.549 55.9012 139.032 55.9967C145.625 56.0939 151.019 50.7389 151.019 44.144V25.0409C151.019 18.446 145.625 13.091 139.032 13.1882V13.1898ZM145.084 44.1456C145.084 47.4554 142.354 50.1362 139.037 50.0407C135.838 49.9485 133.333 47.2265 133.333 44.0139V25.176C133.333 21.9633 135.838 19.2414 139.037 19.1491C142.354 19.0536 145.084 21.7344 145.084 25.0442V44.1473V44.1456ZM93.4837 37.8372V13.9704H69.8646V37.8372C69.8646 47.8045 77.9438 55.9984 87.8734 55.9984V50.0423C81.2148 50.0423 75.7997 44.5194 75.7997 37.8372H93.4837ZM75.7997 31.8796V19.933H87.5502V31.8796H75.7997ZM0 0H5.93346V56H0V0ZM13.5041 19.0701H19.4376V56H13.5041V19.0701ZM58.8786 55.9868C48.9523 55.9835 40.8781 47.8753 40.8781 37.9097V19.9264H32.9433V55.9621H27.0098V2.76147H32.9433V13.972H40.8781V2.73677H46.8115V13.9704H53.9163V19.9264H46.8115V37.9097C46.8115 44.5902 52.2234 50.0259 58.8786 50.0292V2.71371H64.8121V55.9868H58.8786ZM20.138 11.1068C20.138 13.1437 18.4927 14.7937 16.4651 14.7937C14.4375 14.7937 12.7921 13.1421 12.7921 11.1068C12.7921 9.07151 14.4375 7.4199 16.4651 7.4199C18.4927 7.4199 20.138 9.07151 20.138 11.1068ZM176.998 55.9638H170.609L165.166 42.2536L159.707 55.9638H153.317L161.957 34.9028L153.376 14.0082H159.772L165.164 26.9395L170.545 14.0082H176.941L168.36 34.9028L177 55.9638H176.998Z"
            fill="white"
          />
        </svg>
        <p className="pt-[20px] text-[20px]">Welcome to Littlebox Strapi Suite Frontend.</p>
        <p className="pt-[20px] max-w-[650px] text-center text-[#b5b5b5]">
          This is a solution for quick and easy integration with the Strapi + Littlebox Suite plugin.
          <br />
          Feel free to make any necessary modifications, but we recommend reviewing the documentation for a better
          understanding of our approach.
          <br />
          Enjoy! :)
        </p>
        <div className="flex gap-4 items-center flex-row pt-[40px]">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://littlebox.pt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our solutions
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://strapi.littlebox.pt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
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
