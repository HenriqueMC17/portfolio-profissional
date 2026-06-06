import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test('should load main page and verify logo', async ({ page }) => {
    await page.goto('/pt');
    // Verify name HMC logo
    await expect(page.locator('header')).toContainText('HMC.');
  });

  test('should display AI Chatbot toggle and open chat', async ({ page }) => {
    await page.goto('/pt');
    // Verify chatbot toggle button is visible
    const chatbotToggle = page.locator('button[aria-label="Toggle AI assistant"]');
    await expect(chatbotToggle).toBeVisible();

    // Click to open chatbot
    await chatbotToggle.click();

    // Verify chatbot panel is visible
    await expect(page.locator('h3')).toContainText('Assistente IA');
    await expect(page.locator('input[placeholder="Pergunte-me qualquer coisa..."]')).toBeVisible();
  });

  test('should switch language and verify headers', async ({ page }) => {
    await page.goto('/pt');
    // Click language switcher
    const langButton = page.locator('button[title="Switch to English"]');
    if (await langButton.isVisible()) {
      await langButton.click();
      await page.waitForURL('**/en**');
      // Verify chatbot header in English
      const chatbotToggle = page.locator('button[aria-label="Toggle AI assistant"]');
      await chatbotToggle.click();
      await expect(page.locator('h3')).toContainText('AI Assistant');
    }
  });
});
