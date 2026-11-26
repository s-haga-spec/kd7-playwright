import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { saveEvidence } from './helpers/evidence';

test('ダッシュボード表示確認', async ({ page }) => {

  await login(page);

  await expect(
    page.getByText('ダッシュボード')
  ).toBeVisible();

  await saveEvidence(
    page,
    '10_dashboard_home'
  );

});