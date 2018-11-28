import express from "express";
import morgan from "morgan";

import constants from "./config/constants";
import middlewares from "./middleware";

const server = express();
server.use(morgan("dev"));
server.use(express.json());

// Passing all of our APIs config/endpoints to our express server to use them

middlewares(server);

// Starting our Express server and pass it the port to listen to.

server.listen(constants.PORT, () => {
  console.log(`server is running to port:${constants.PORT}`);
});

// Exported the server for testing purpose //

export default server;
