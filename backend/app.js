const express = require('express');
const app = express();
const routes = require('./resources/routes');
const contract = require('./contract/instance');

async function main(){
  app.use(express.json())

  const defaultAccount = await contract.defaultAccount;
  console.log("Default account ", defaultAccount);
  routes(app, contract, defaultAccount);

  app.listen(contract.port, () => {
    console.log('listening on port '+ contract.port);
  })
}

main();
