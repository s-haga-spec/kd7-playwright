import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {

  await page.goto(
    'https://beta-kd7-2025-admin.dk-lab.jp/Login'
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
    width: 1920,
    height: 1080,
  });

  await page.waitForTimeout(2000);
}

test('ダッシュボード表示確認', async ({ page }) => {

  await login(page);

  await expect(
    page.getByText('ダッシュボード')
  ).toBeVisible();

  await page.screenshot({
    path: 'evidence/10_dashboard_home.png',
    fullPage: false,
  });

});