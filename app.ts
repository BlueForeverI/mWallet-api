import "reflect-metadata"; // this shim is required
import {createExpressServer, useContainer, Action} from "routing-controllers";
import { useContainer as useOrmContainer } from "typeorm";
import {createConnection } from "typeorm";
import {Container} from "typedi";

import {UserController} from "./controllers/UserController";
import { User } from "./models/User";

useContainer(Container);
useOrmContainer(Container);
createConnection().then(async (conn) => {
  const app = createExpressServer({
    routePrefix: '/api',
    controllers: [UserController],
    authorizationChecker: (action: Action, roles: string[]): Promise<boolean> => {
      const token = action.request.headers["authorization"];

      if(!token) {
        return Promise.resolve(false);
      }

      return conn.getRepository(User)
        .findOneOrFail({ token: token })
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(false));
    }
  });

  app.listen(process.env.port || 3000); 
  console.log('The server is up and running...');
});