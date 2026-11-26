import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

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

test('利用状況表示確認', async ({ page }) => {

  await login(page);

  await expect(
    page.getByText('利用状況', {
      exact: true,
    })
  ).toBeVisible();

  await page.screenshot({
    path: 'evidence/11_dashboard_status.png',
    fullPage: false,
  });

});