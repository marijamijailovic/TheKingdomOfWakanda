const express = require('express');
const app = express();
const Web3 = require('web3');
const routes = require('./resources/routes');
const contract = require('./contract/instance');

const httpEndPoint = "http://127.0.0.1:8545";

async function main(){
  app.use(express.json())

  const defaultAccount = await contract.defaultAccount;
  routes(app, contract, defaultAccount);

  app.listen(process.env.PORT || 8082, () => {
    console.log('listening on port '+ (process.env.PORT || 8082));
  })
}

main();
