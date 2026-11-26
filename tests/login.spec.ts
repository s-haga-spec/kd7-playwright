import { test, expect } from '@playwright/test';
import { ADMIN_BASE_URL } from './helpers/login';

test('P1-01 認証エラー時のログイン制御確認', async ({ page }) => {

  await page.goto(
    `${ADMIN_BASE_URL}/Login`
  );

  await page.getByRole('textbox', {
    name: 'ユーザID'
  }).fill('dummy-user');

  await page.getByRole('textbox', {
    name: 'パスワード'
  }).fill('dummy-pass');

  await page.getByRole('button', {
    name: /ログイン/
  }).click();

  await expect(page).toHaveURL(
    /Login/
  );

  await page.screenshot({
    path: 'evidence/P1-01_login_error.png',
    fullPage: false,
  });

});

test('P1-02 初回ログイン時のパスワード変更遷移確認', async ({ page }) => {

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
    page.getByText('パスワード変更')
  ).toBeVisible();

  await page.screenshot({
    path: 'evidence/P1-02_first_login.png',
    fullPage: false,
  });

});