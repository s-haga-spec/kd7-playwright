import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('受講者別受講状況導線確認', async ({ page }) => {

  await login(page);

  // ダッシュボードへ遷移
  await page.getByRole('link', {
    name: '一覧'
  }).first().click();

  await page.waitForLoadState('networkidle');

  // 部門選択
  await page
    .locator('#sectionMultiSelectorDiv')
    .getByRole('button', {
      name: '選択'
    })
    .click();

  await page.getByRole('button', {
    name: '決定'
  }).click();

  // 検索実行
  await page.locator('#btn-search').click();

  await page.waitForLoadState('networkidle');

  // 検索結果の証跡
  await page.screenshot({
    path: 'evidence/20_progress_search.png',
    fullPage: false,
  });

  // 導線ボタン確認
  const progressButton = page.getByRole('link', {
    name: '受講者別受講状況で確認'
  });

  await expect(progressButton)
    .toBeVisible();

  // 受講者別受講状況へ遷移
  await progressButton.click();

  await page.waitForLoadState('networkidle');

  // 遷移後証跡
  await page.screenshot({
    path: 'evidence/21_progress_page.png',
    fullPage: false,
  });

  // ダッシュボードではない画面へ遷移したこと
  await expect(page).not.toHaveURL(
    /Dashboard/
  );

});