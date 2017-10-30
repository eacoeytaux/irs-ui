# Hyperleder Fabric interest rate swap demo UI
The front-end of the Hyperledger Fabric interest rate swap demo

## Usage

- First, start the server with `node index.js`
- To log in, you must start the rest server found at github.com/eacoeytaux/irs with the command `npm install && composer network deploy -a dist/irs.bna -p hlfv1 -i PeerAdmin -s randomString && source rest_config.sh && composer-rest-server -p hlfv1 -n irs -i admin -s adminpw -N never -w true`.
- Once this is done, go to localhost:3000/explorer and create all the Companies/LIBORAuthorities you would like to use, as well as issue the necessary identities (be sure to save the identity secrets).
- After all identities have been issued, shut down the rest server and restart it with the command `composer-rest-server -p hlfv1 -n irs -i admin -s adminpw -N never -w true -a true -m true`.  Go to localhost:8192 and for each participant log in with a different github account.  This will take you back to the swagger UI, where you must bind the desired identity to the default wallet, and copy the access token at the top of the page and paste it into the localhost:8192 page.
- If all this has been done correctly you will be able to select an identity, which will take you to the manage page.
