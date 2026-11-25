import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('指導コックピット表示確認', async ({ page }) => {

  await login(page);
  
  await page.keyboard.press('Escape');

  await expect(
    page.getByRole('link', {
      name: /^全て/
    })
  ).toBeVisible();

  // ホーム全体
  await page.screenshot({
    path: 'evidence/00_home.png',
    fullPage: false,
  });
});

test('指導コックピットタブ切替確認', async ({ page }) => {

  await login(page);

  const allTab = page.getByRole('link', {
    name: /^全て/
  });

  const deptTab = page.getByRole('link', {
    name: /^部門 \d+/
  });

  const classTab = page.getByRole('link', {
    name: /^クラス運用/
  });

  const approvalTab = page.getByRole('link', {
    name: /^承認 \d+/
  });

  // 全て
  await page.screenshot({
    path: 'evidence/01_cockpit_all.png',
    fullPage: true,
  });

  // 部門
  await deptTab.click();

  await expect(deptTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await page.screenshot({
    path: 'evidence/02_cockpit_department.png',
    fullPage: true,
  });

  // クラス運用
  await classTab.click();

  await expect(classTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await page.screenshot({
    path: 'evidence/03_cockpit_class.png',
    fullPage: true,
  });

  // 承認
  await approvalTab.click();

  await expect(approvalTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await page.screenshot({
    path: 'evidence/04_cockpit_approval.png',
    fullPage: true,
  });

  // 全てに戻る
  await allTab.click();

  await expect(allTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await page.screenshot({
    path: 'evidence/05_cockpit_all_return.png',
    fullPage: true,
  });

});