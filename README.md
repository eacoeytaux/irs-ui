# Hyperleder Fabric interest rate swap demo UI
The front-end of the Hyperledger Fabric interest rate swap demo

The chaincode back-end side of this app can be found at github.com/eacoeytaux/irs 

## Usage

- First, start the server with `node index.js`
- To log in, you must start the rest server found at github.com/eacoeytaux/irs with the command `npm install && composer network deploy -a dist/irs.bna -p hlfv1 -i PeerAdmin -s randomString -A admin -S && source rest_config.sh && composer-rest-server -p hlfv1 -n irs -i admin -s adminpw -N never -w true`.
- Once this is done, go to localhost:3000/explorer and create all the Companies/LIBORAuthorities you would like to use, as well as issue the necessary identities (be sure to save the identity secrets).
- After all identities have been issued, shut down the rest server and restart it (with authentication enabled) with the command `composer-rest-server -p hlfv1 -n irs -i admin -s adminpw -N never -w true -a true -m true`.
- Go to localhost:8192 and for each participant log in with a different github account.  This will take you back to the swagger UI, where you must bind the desired identity to the default wallet, and copy the access token at the top of the page and paste it into the localhost:8192 page.
⋅⋅⋅This authenticates the client directly with the REST server, providing them with the access token which is used a query parameter in every transaction submitted to the REST server.  This access token can be used indefinitely, although a new one can be retrieved by re-signing in with the same github account.
- If all this has been done correctly you will be able to select an identity, which will take you to the manage page.

