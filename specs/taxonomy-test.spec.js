/**
 * WordPress dependencies
 */
const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

test.describe("Create and delete Taxonomy", () => {
  test("should create and delete category", async ({ page, admin }) => {
    await admin.visitAdminPage("edit-tags.php", "taxonomy=category");

    //create category
    await page.type("#tag-name", "test category" + Math.random());
    await page.click('role=button[name="Add New Category"i]');

    //expect successful category creation
    await expect(page.locator("#ajax-response > div")).toHaveText(
      "Category added.Dismiss this notice."
    );

    // delete category
    await page
      .locator(
        "tr[id^='tag-'] td[class='name column-name has-row-actions column-primary']"
      )
      .first()
      .click();
    await page.locator("span.delete").first().click();
    await page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });

  test("should create and delete tags", async ({ page, admin }) => {
    await admin.visitAdminPage("edit-tags.php", "taxonomy=post_tag");

    //create tag
    await page.type("#tag-name", "test tag" + Math.random());
    await page.click('role=button[name="Add New Tag"i]');

    //expect successful tag creation
    await expect(page.locator("#ajax-response > div > p")).toHaveText(
      "Tag added."
    );

    // delete category
    await page
      .locator(
        "tr[id^='tag-'] td[class='name column-name has-row-actions column-primary']"
      )
      .first()
      .click();
    await page.locator(".delete").first().click();
    await page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });
});
