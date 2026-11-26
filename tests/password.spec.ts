import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { saveEvidence } from './helpers/evidence';

test('P1-03_P1-04 パスワード変更からホーム遷移確認',
async ({ page }) => {

  await page.goto(
    `${ADMIN_BASE_URL}/Login`
  );

  await page.getByRole('textbox', {
    name: 'ユーザID'
  }).fill('haga-first01');

  await page.getByRole('textbox', {
    name: 'パスワード'
  }).fill('pass');

  await page.getByRole('button', {
    name: /ログイン/
  }).click();

  await expect(
    page.getByRole('textbox', {
      name: '現在のパスワードを入力'
    })
  ).toBeVisible();

  await page.getByRole('textbox', {
    name: '現在のパスワードを入力'
  }).fill('pass');

  await page.locator('#NewPassword')
    .fill('Pass1234!');

  await page.locator('#NewPasswordConfirm')
    .fill('Pass1234!');

  await page.getByRole('button', {
    name: 'パスワードを変更'
  }).click();

  await page.screenshot({
    path: 'evidence/P1-03_password_change.png',
    fullPage: false,
  });

  await page.getByRole('button', {
    name: 'ホーム画面へ'
  }).click();

  await expect(
    page.getByText('ダッシュボード')
  ).toBeVisible();

  await saveEvidence(
  page,
  'P1-04_home_transition'
);

});