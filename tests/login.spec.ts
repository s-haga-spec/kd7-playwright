import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('ログイン確認', async ({ page }) => {

  await login(page);

  await expect(page)
    .not.toHaveURL(/Login/i);

});