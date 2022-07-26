/**
 * WordPress dependencies
 */
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Add New Post', () => {
  test.beforeEach(async ({ admin, editor }) => {
    const title = 'test post';
    await admin.createNewPost({ title }); //Create a new post
    await editor.publishPost();
  });

  test( 'Should edit post', async ({ page, admin }) => {
    await admin.visitAdminPage( '/' );
    await page.click( '#menu-posts' ); //Click on Posts Menu
    await page.waitForSelector( '#the-list' );

    //If there are more than one test post then click on newly created test post.
    await page.locator( 'role=link[name="“test post” (Edit)"i]' ).first().click();

    page.locator( '.editor-post-title__input' );

    await page.type( '.editor-post-title__input', 'edit' );

    //Double check, click again on publish button
    await page.click( '.editor-post-publish-button__button' );

    // A success notice should show up
    page.locator( '.components-snackbar__content' );
  });
});
