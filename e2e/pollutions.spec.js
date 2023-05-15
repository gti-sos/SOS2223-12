// @ts-check
import { test, expect } from '@playwright/test';

test('home has title correct', async ({ page }) => {
  await page.goto('localhost:12345');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("SOS2223-12");
});

test('navigate to pollutions page', async ({ page }) => {
    await page.goto('localhost:12345');
    // Click the get started link.
    await page.getByRole('link', { name: 'Datos-Contaminaciones' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Datos-Contaminaciones");

    // Comprobación de que hay datos
    await expect((await page.locator(".datosPol").all()).length).toBeGreaterThan(0);
});

test('navigate to graph-pollutions page', async ({ page }) => {
    await page.goto('localhost:12345');
    
    // Click the get started link.
    await page.getByRole('link', { name: 'Gráficas-Contaminaciones' }).click();
    
    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Gráficas Contaminaciones");
});

/*test('navigate to integrations/uses pollutions page', async ({ page }) => {
    await page.goto('localhost:12345');
        
    // Click the get started link.
    await page.getByRole('link', { name: 'Usos/Integraciones-Contaminaciones' }).click();
        
    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Integraciones/Usos Contaminaciones");
});*/