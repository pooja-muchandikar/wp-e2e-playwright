/**
 * WordPress dependencies
 */
const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

test.describe("edit a page", () => {
  test.beforeEach(async ({ admin, editor }) => {
    await admin.createNewPost({ postType: "page", title: "Test page" });
    await editor.publishPost();
  });

  test("Should edit page", async ({ page, admin }) => {
    await admin.visitAdminPage("/");

    await page.click("#menu-pages");

    await page.locator('role=link[name="“Test page” (Edit)"i]').first().click();

    await page.waitForSelector(".editor-post-title__input", { timeout: 60000 });

    await page.type(".editor-post-title__input", "edit"); //Enter the post title as edit
    await page.keyboard.press("ArrowDown");
    await page.keyboard.type("edit");

    //Double check, click again on publish button
    await page.click(".editor-post-publish-button__button");
    await expect(page.locator(".components-snackbar__content")).toHaveText(
      "Page updated.View Page"
    );
  });
});
