import { test, expect } from "@playwright/test";

test.describe("PokemonCard Story", () => {
  const storyUrl =
    "http://localhost:6006/iframe.html?id=composants-pokemoncard--default";

  test.beforeEach(async ({ page }) => {
    await page.goto(storyUrl);
  });

  test("should display the PokemonCard component", async ({ page }) => {
    const nameLocator = page.locator("text=Pikachu");
    await expect(nameLocator).toBeVisible();

    const imageLocator = page.locator("img");
    await expect(imageLocator).toHaveAttribute("src", /25\.png/);
  });

  test("should toggle favorite state when button is clicked", async ({
    page,
  }) => {
    const buttonLocator = page.locator('[data-testid="favorite-toggle"]');

    await expect(buttonLocator).toHaveText(/Add Favorite/);

    await buttonLocator.click();
    await expect(buttonLocator).toHaveText(/Remove Favorite/);

    await buttonLocator.click();
    await expect(buttonLocator).toHaveText(/Add Favorite/);
  });
});
