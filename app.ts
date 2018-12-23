import "reflect-metadata"; // this shim is required
import {createExpressServer, useContainer} from "routing-controllers";
import { useContainer as useOrmContainer } from "typeorm";
import {createConnection } from "typeorm";
import {Container} from "typedi";

import {UserController} from "./controllers/UserController";

useContainer(Container);
useOrmContainer(Container);
createConnection().then(async conn => {
  const app = createExpressServer({
    routePrefix: '/api',
    controllers: [UserController]
  })

  app.listen(process.env.port || 3000); 
  console.log('The server is up and running...');
});