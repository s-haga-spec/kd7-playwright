import { test, expect } from '@playwright/test';

test('ログイン確認', async ({ page }) => {

  await page.goto('https://beta-kd7-2025-admin.dk-lab.jp/Login');

  await page.getByRole('textbox', {
    name: 'ユーザID'
  }).fill('haga-admin');

  await page.getByRole('textbox', {
    name: 'パスワード'
  }).fill('pass');

  await page.getByRole('textbox', {
    name: 'パスワード'
  }).press('Enter');

  await page.waitForLoadState('networkidle');

  // URL変化確認
  await expect(page).not.toHaveURL(
    /Login/i
  );
});