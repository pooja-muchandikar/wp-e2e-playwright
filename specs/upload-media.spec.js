/**
 * WordPress dependencies
 */
const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

test.describe("Upload Media", () => {
  test("Should able to upload media", async ({ page, admin }) => {
    await admin.visitAdminPage("media-new.php");

    page.locator("div[class='wrap'] h1"); //Wait for Upload media text

    const [fileChooser] = await Promise.all([
      // It is important to call waitForEvent before click to set up waiting.
      page.waitForEvent("filechooser"),
      // Opens the file chooser.
      page.locator('role=button[name="Select Files"i]').click(),
    ]);
    await fileChooser.setFiles(["img.jpg"]);

    //Validate the media items.
    page.locator("#media-items");

    await expect(page.locator(".media-list-title")).toHaveText("img");
  });
});
