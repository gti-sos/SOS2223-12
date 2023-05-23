// @ts-check
import { test, expect } from '@playwright/test';

test('home has title correct', async ({ page }) => {
  await page.goto('localhost:12345');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("SOS2223-12");
});

test('navigate to library page', async ({ page }) => {
    await page.goto('localhost:12345');
    // Click the get started link.
    await page.getByRole('link', { name: 'Datos-Bibliotecas' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Datos-Bibliotecas");

    // Comprobación de que hay datos
    await expect((await page.locator(".datosLib").all()).length).toBeGreaterThan(0);
});

test('navigate to graph-library page', async ({ page }) => {
    await page.goto('localhost:12345');
    
    // Click the get started link.
    await page.getByRole('link', { name: 'Gráficas-Bibliotecas' }).click();
    
    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Gráficas Bibliotecas");
});

/*test('navigate to integrations/uses agroclimatic page', async ({ page }) => {
    await page.goto('localhost:12345');
        
    // Click the get started link.
    await page.getByRole('link', { name: 'Usos/Integraciones-Bibliotecas' }).click();
        
    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-12-Integraciones/Usos Bibliotecas");
});*/