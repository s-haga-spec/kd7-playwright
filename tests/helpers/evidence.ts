import { Page } from '@playwright/test';

export async function saveEvidence(
  page: Page,
  fileName: string
) {
  await page.screenshot({
    path: `evidence/${fileName}.png`,
    fullPage: false,
  });
}