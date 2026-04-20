// @ts-check
import { test, expect } from '@playwright/test';

// 1. lo mas recomendable es usar Roles, aria
// 2. etiquetas de texto, placeholders, nombres
// 3. data-testid
// 4. selectores de CSS como último recurso

test('La aplicación carga correctamente y muestra el buscador', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const searchInput = page.getByRole('searchbox')
    await expect(searchInput).toBeVisible()
})

test('Un usuario puede buscar empleos por tecnología', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('React')

    await page.getByRole('button', { name: 'Buscar' }).click()

    const jobCards = page.locator('li[data-modalidad]')
    await expect(jobCards.first()).toBeVisible({ timeout: 10000 })
})

test('Buscar empleos y aplicar a una oferta', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('JavaScript')

    await page.getByRole('button', { name: 'Buscar' }).click()

    const jobCards = page.locator('li[data-modalidad]')
    await expect(jobCards.first()).toBeVisible({ timeout: 10000 })

    await jobCards.first().locator('a[aria-label*="Ver detalles"]').last().click()

    await expect(page.locator('h1').last()).toBeVisible({ timeout: 10000 })

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()

    const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
    await applyButton.click()

    await expect(page.getByRole('button', { name: 'Aplicado' }).first()).toBeVisible()
})

test('Filtrar por ubicación remoto', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    await page.locator('select').nth(2).selectOption('remoto')

    const jobCards = page.locator('li[data-modalidad]')
    await expect(jobCards.first()).toBeVisible({ timeout: 10000 })

    await expect(jobCards.first()).toHaveAttribute('data-modalidad', 'remoto')
})

test('Filtrar por nivel senior', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    await page.locator('select').nth(1).selectOption('senior')

    const jobCards = page.locator('li[data-modalidad]')
    await expect(jobCards.first()).toBeVisible({ timeout: 10000 })

    await expect(jobCards.first()).toHaveAttribute('data-nivel', 'senior')
})

test('Aparece paginación y se puede navegar a la siguiente página', async ({ page }) => {
    await page.goto('http://localhost:5173/search')  // ← /search

    const jobCards = page.locator('li[data-modalidad]')
    await expect(jobCards.first()).toBeVisible({ timeout: 10000 })

    const pagination = page.locator('nav[class*="pagination"]')
    await expect(pagination).toBeVisible()

    const firstJobBefore = await jobCards.first().locator('h3').innerText()

    await page.getByRole('link', { name: 'Ir a la página siguiente' }).click()

    await expect(jobCards.first()).toBeVisible({ timeout: 10000 })

    const firstJobAfter = await jobCards.first().locator('h3').innerText()
    expect(firstJobBefore).not.toBe(firstJobAfter)
})

test('Se puede ver el detalle de un empleo y aplicar', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    const jobCards = page.locator('li[data-modalidad]')
    await expect(jobCards.first()).toBeVisible({ timeout: 10000 })

    await jobCards.first().locator('a[aria-label*="Ver detalles"]').last().click()

    await expect(page.locator('h1').last()).toBeVisible({ timeout: 10000 })
    await expect(page).toHaveURL(/\/jobs\//)

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()

    const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
    await expect(applyButton).toBeVisible({ timeout: 10000 })

    await applyButton.click()

    await expect(page.getByRole('button', { name: 'Aplicado' }).first()).toBeVisible()
})