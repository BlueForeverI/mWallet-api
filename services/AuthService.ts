import { Service } from "typedi";
import { Connection } from "typeorm";
import { AuthorizationChecker } from "routing-controllers/AuthorizationChecker";
import { Action } from "routing-controllers";
import { User } from "../models/User";
import { CurrentUserChecker } from "routing-controllers/CurrentUserChecker";

@Service()
export class AuthService {
  public authorizationChecker(conn: Connection): AuthorizationChecker {
    return (action: Action, roles: string[]): Promise<boolean> => {
      const token = action.request.headers["authorization"];

      if(!token) {
        return Promise.resolve(false);
      }

      return conn.getRepository(User)
        .findOneOrFail({ token: token })
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(false));
    }
  }

  public currentUserChecker(conn: Connection): CurrentUserChecker {
    return (action: Action): Promise<User> => {
      const token = action.request.headers["authorization"];

      if(!token) {
        return Promise.resolve(null);
      }

      return conn.getRepository(User).findOneOrFail({ token: token });
    };
  }
}