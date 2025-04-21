import { NextRequest, NextResponse } from 'next/server'
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  const data: { locales: string[]; default: string; } = await fetch(
    `${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/locales`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  const path = req.nextUrl.pathname.split("/");
  const pathLocale = data.locales.find((locale: string) => locale === path[1]);
  const locale = pathLocale || data.default;
  const response = NextResponse.next()
  response.cookies.set('NEXT_LOCALE', locale);
  return response;
}