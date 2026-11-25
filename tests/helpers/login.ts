import { Page } from '@playwright/test';

export const ADMIN_BASE_URL = 'https://beta-kd7-2025-admin.dk-lab.jp';

export async function login(page: Page) {
  await page.goto(`${ADMIN_BASE_URL}/Login`);

  await page.getByRole('textbox', { name: 'ユーザID' }).fill('haga-admin');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('pass');

  await page.getByRole('button', { name: /ログイン/ }).click();
  await page.waitForLoadState('networkidle');

  // エビデンス用に最大サイズへ
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });

  await page.waitForTimeout(2000);
}