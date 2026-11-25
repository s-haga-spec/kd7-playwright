import { test, expect, Page } from '@playwright/test';
import { ADMIN_BASE_URL, login } from './helpers/login';

async function selectInModal(
  page: Page,
  heading: string | RegExp,
  rowName: RegExp | string,
) {
  const dialog = page.getByRole('dialog').filter({
    has: page.getByRole('heading', { name: heading }),
  });

  await expect(dialog).toBeVisible();

  const row = dialog.getByRole('row', { name: rowName }).first();
  await row.getByRole('checkbox').check();

  await dialog.getByRole('button', { name: '決定' }).click();
  await expect(dialog).toBeHidden();
}

test('ダッシュボード検索（部門・クラス指定）', async ({ page }) => {
  test.setTimeout(60_000);

  await login(page);

  await page.goto(`${ADMIN_BASE_URL}/Home/Dashboard`);
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#sectionMultiSelectorDiv')).toBeVisible();

  await page
    .locator('#sectionMultiSelectorDiv')
    .getByRole('button', { name: '選択' })
    .click();
  await selectInModal(page, '部門の選択', /^kd7haga/);

  await page.getByRole('radio', { name: '個別に選択' }).check();

  await page
    .locator('#courseMultiSelectorDiv')
    .getByRole('button', { name: '選択' })
    .click();
  await selectInModal(page, 'クラスの選択', /0106アンケート/);

  await page.locator('#btn-search').click();

  await expect(page).toHaveURL(/search=true/);
  await expect(page.getByText('利用状況', { exact: true })).toBeVisible();
  await expect(
    page.getByText('受講登録済みユーザ数', { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: /アンケート/ })).toBeVisible();
});