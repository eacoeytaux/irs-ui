# Hyperleder Fabric interest rate swap demo UI
The front-end of the Hyperledger Fabric interest rate swap demo

The chaincode back-end side of this app can be found at github.com/eacoeytaux/irs 

## Usage

- First, start the UI server with `node index.js`
- To log in, you must start the rest server found at github.com/eacoeytaux/irs with the command `npm install && composer network deploy -a dist/irs.bna -p hlfv1 -i PeerAdmin -s randomString -A admin -S && source rest_config.sh && composer-rest-server -p hlfv1 -n irs -i admin -s adminpw -N never -w true`.
- Once this is done, go to localhost:3000/explorer and create all the Companies/LIBORAuthorities you would like to use, as well as issue the necessary identities (be sure to save the identity secrets).
⋅⋅1. First go to the Company or LIBORAuthority tab and go to POST /Company.
⋅⋅2. Click on "Example Value" JSON on the right side, and replace the "name" and "balance" (Companies only) with the desired values.
⋅⋅3. Then go to the System tab and go to POST /systems/identities/bind.
⋅⋅4. Click on "Example Value" JSON on the right side, and in "participant" put "resource:fabric.hyperledger.Company/LIBORAuthority#\<name\>", in "user" put the desired name of the new identity, and delete the "options" field.  **MAKE SURE TO SAVE THE RETURNED SECRET**.
- After all identities have been issued, shut down the rest server and restart it (with authentication enabled) with the command `composer-rest-server -p hlfv1 -n irs -i admin -s adminpw -N never -w true -a true -m true`.
- Go to localhost:8192 and for each participant log in with a separate github account by following the link on the login page.  This will take you back to the swagger UI, where you must bind the desired identity to the default wallet, and copy the access token at the top of the page and paste it into the localhost:8192 page.  This authenticates the client directly with the REST server, providing them with the access token which is used a query parameter in every transaction submitted to the REST server.  This access token can be used indefinitely, although a new one can be retrieved by re-signing in with the same github account.
⋅⋅1. First go to the Wallet tab and go to GET /Wallet.  The "id" that is returned is the wallet id you will use in the next step.
⋅⋅2. Now go to POST /wallets/{id}/identities and click on the "Example Value" JSON on the right side.  Delete the "id" value but enter the "id" from above in the id parameter text input above the JSON input.  In the JSON, replace "enrollmentID" with the name of the identity you intend to log in as and replace "enrollmentSecret" with their secret returned from step 4.  If successful the response body should return the "id," "enrollmentID," and "enrollmentSecret".
⋅⋅3. Copy the access token from the top of the swagger UI into the input field back on localhost:8192 and hit "Submit"
- If all this has been done correctly you will be able to select an identity, which will take you to the manage page.
- From here, Company entities can manage your IRSs by proposing, approving/denying, and settling payments.  LIBOR Authority entities will not see an IRS manage page but instead see a page where they can submit new LIBOR Index values.  Both types or participants will be able to view already submitted LIBOR Index values under the view tab.

