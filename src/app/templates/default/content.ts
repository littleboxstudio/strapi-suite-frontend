import { Page } from "@/app/core/types";

export default async function (page: Page): Promise<void> {
  page.document.custom = 'custom property value';
}
