import "reflect-metadata"; // this shim is required
import {createExpressServer, useContainer} from "routing-controllers";
import { useContainer as useOrmContainer } from "typeorm";
import {createConnection } from "typeorm";
import {Container} from "typedi";

import {UserController} from "./controllers/UserController";
import { AuthService } from "./services/AuthService";
import { ExpenseController } from "./controllers/ExpenseController";
import { CategoryController } from "./controllers/CategoryController";

useContainer(Container);
useOrmContainer(Container);
const authService: AuthService = Container.get(AuthService);

createConnection().then(async (conn) => {
  const app = createExpressServer({
    routePrefix: '/api',
    controllers: [UserController, ExpenseController, CategoryController],
    validation: true,
    classTransformer: true,
    cors: true,
    authorizationChecker: authService.authorizationChecker(conn),
    currentUserChecker: authService.currentUserChecker(conn)
  });

  app.listen(process.env.port || 3000); 
  console.log('The server is up and running...');
});