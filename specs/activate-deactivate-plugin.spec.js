/**
 * WordPress dependencies
 */
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

const timeout = 10000;
const slug = "hello-dolly";
test.describe( 'Activate Deactivate Plugin' , () => {
  test( 'should activate plugin successfully' , async ( { requestUtils } ) => {
    await requestUtils.activatePlugin( slug );
  });

  test( 'should deactivate plugin successfully', async ( { requestUtils } ) => {
    await requestUtils.deactivatePlugin( slug );
  });
});
