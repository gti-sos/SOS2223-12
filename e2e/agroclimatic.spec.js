// @ts-check
import { test, expect } from '@playwright/test';

test('home has title correct', async ({ page }) => {
  await page.goto('localhost:12345');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("SOS2223-12");
});

/*test('navigate to agroclimatic page', async ({ page }) => {
    await page.goto('localhost:12345');

    // Click the get started link.
    await page.getByRole('link', { name: 'Agroclimáticas' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Agroclimáticas");
});*/

test('navigate to graph-agroclimatic page', async ({ page }) => {
    await page.goto('localhost:12345');
    
    // Click the get started link.
    await page.getByRole('link', { name: 'Gráficas-Agroclimáticas' }).click();
    
    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Gráficas Agroclimáticas");
});

test('navigate to integrations/uses agroclimatic page', async ({ page }) => {
    await page.goto('localhost:12345');
        
    // Click the get started link.
    await page.getByRole('link', { name: 'Usos/Integraciones-Agroclimáticas' }).click();
        
    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Integraciones/Usos Agroclimáticas");
});