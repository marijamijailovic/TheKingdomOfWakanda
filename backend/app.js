const express = require("express");
const config = require("./config");
const cors = require("./resources/middleware/cors");
const routes = require("./resources/routes");
const error = require("./resources/middleware/error");
const app = express();
const port = config.PORT;

async function main(){

  app.use(express.json());
  app.use(cors.corsSetup);
  app.use("/api", routes);
  app.use(error.errorHandler);

  app.listen(port, () => {
    console.log("listening on port "+ port);
  })
}

main();
