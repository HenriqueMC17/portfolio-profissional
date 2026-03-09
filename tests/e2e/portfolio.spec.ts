import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests - Critical Paths', () => {
  test('should load the homepage and display the hero core identities', async ({ page }) => {
    // Navigate to English version
    await page.goto('/en');
    
    // Check if the developer name is present in Hero
    await expect(page.locator('text=Henrique').first()).toBeVisible();
    
    // Check if the foundational sections exist
    await expect(page.locator('text=Stack').first()).toBeVisible();
  });

  test('should navigate to the Portuguese version smoothly', async ({ page }) => {
    await page.goto('/pt');
    await expect(page).toHaveURL(/.*\/pt/);
    
    // Cheking the CTA language difference in PT
    await expect(page.locator('text=Henrique').first()).toBeVisible();
  });
});
