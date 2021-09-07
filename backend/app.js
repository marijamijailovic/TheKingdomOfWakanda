const express = require("express");
const config = require("./config");
const routes = require("./resources/routes");

const app = express();
const port = config.PORT;

async function main(){

  app.use(express.json());
  
  routes(app);

  app.listen(port, () => {
    console.log("listening on port "+ port);
  })
}

main();
