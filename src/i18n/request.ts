import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const nextLocale = cookieStore.get('NEXT_LOCALE');
  const locale = (nextLocale as { name: string; value: string; }).value;
  const translations = await fetch(
    `${process.env.API_BASE_URL}/api/littlebox-strapi-suite/modules/translations`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  const mappedTranslations: Record<string, string> = {};
  translations.forEach((translation: { uid: string; translations: Record<string, string>; }) => {
    mappedTranslations[translation.uid] = translation.translations[locale];
  });
  return {
    locale,
    messages: mappedTranslations
  };
});