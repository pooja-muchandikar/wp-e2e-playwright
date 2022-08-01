/**
 * WordPress dependencies
 */
 const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

 test.describe( 'Assign parent Page to child page', () => {
   test( 'should assign a parent page to child page', async ( { page, admin } ) => {
     await admin.visitAdminPage( 'edit.php', 'post_type=page' );
     await page.waitForSelector( '#the-list' , { visible: true });
     await page.locator( '#the-list strong > a' ).first().click();
     await page.waitForSelector( '.components-panel', { visible: true });
 
     // assigning child page to parent page
     page.locator( '.editor-post-title__input' );
 
     await page.type( '.editor-post-title__input', 'edit' );
 
     await page.locator( 'role=button[name="Page Attributes"i]' ).click();
 
     await page.waitForSelector( '#components-form-token-input-0', {
       visible: true,
     });
     await page.click( 'role=combobox[name="Parent Page:"i]' );
     await page.type( 'role=combobox[name="Parent Page:"i]', 'pa' );
     await page.keyboard.press( 'ArrowDown' );
     await page.keyboard.press( 'Enter' );
     await page.locator( 'role=button[name="Update"i]' ).first().click();
 
     //expect successful update message
     await expect(page.locator( '.components-snackbar__content' )).toHaveText(
       'Page updated.View Page'
     );
   });
 });