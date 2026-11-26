import { Page } from '@playwright/test';

export const ADMIN_BASE_URL =
  'https://beta-kd7-2025-admin.dk-lab.jp';

export async function login(page: Page) {

  await page.goto(
    `${ADMIN_BASE_URL}/Login`
  );

  await page.getByRole('textbox', {
    name: 'ユーザID'
  }).fill('haga-admin');

  await page.getByRole('textbox', {
    name: 'パスワード'
  }).fill('pass');

  await page.getByRole('button', {
    name: /ログイン/
  }).click();

  await page.waitForLoadState('networkidle');

  await page.setViewportSize({
    width: 2560,
    height: 1440,
  });

  await page.waitForTimeout(2000);
}