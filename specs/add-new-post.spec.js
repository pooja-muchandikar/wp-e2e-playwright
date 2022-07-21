/**
 * WordPress dependencies
 */
 const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Add New Post', () => {
	test.beforeEach( async ( { page,admin } ) => {
		// await loginUser();
		await admin.createNewPost();
		await page.$( '[placeholder="Add title"]' );
	} );


	test( 'Should create new post', async ( { page } ) => {

		await page.type('.editor-post-title__input','Test Post');
		// await page.type('p.block-editor-rich-text__editable editor-rich-text__editable.wp-block-paragraph','This is the test post');
		
		//Click on publish button
		await page.click('.editor-post-publish-panel__toggle');

		//Double check, click again on publish button
		await page.click('.editor-post-publish-button');


		// A success notice should show up
		page.waitForSelector( '.components-snackbar' );
	} );
} );


