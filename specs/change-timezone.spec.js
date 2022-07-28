/**
 * WordPress dependencies
 */
 const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Change timezone', () => {

test( 'Should able to change time zone', async ( {admin,page} ) => {

    await admin.visitAdminPage( '/' );

    await page.click( '#menu-settings' ); //click on settings menu
    page.locator(" table[role='presentation']" );
    await page.locator( 'select#timezone_string' ).selectOption( 'Africa/Libreville' );  //Select the Libreville timezone from dropdown
    await page.click( '#submit' );

     //wait for the settings saved message
    await expect(page.locator( '#setting-error-settings_updated' )).toHaveText( 'Settings saved.' );

    } );
} );