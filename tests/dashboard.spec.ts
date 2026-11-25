import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('ダッシュボード表示確認', async ({ page }) => {
  await login(page);

  await expect(page.getByText('ダッシュボード')).toBeVisible();

  await page.screenshot({
    path: 'evidence/10_dashboard_home.png',
    fullPage: false,
  });
});