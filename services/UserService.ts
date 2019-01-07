import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../models/User";
import { ObjectID } from 'mongodb';
import { Repository, DeleteResult } from "typeorm";
import { x2 } from 'sha256';

import { RegisterViewModel } from "../view-models/RegisterViewModel";
import { LoginViewModel } from "../view-models/LoginViewModel";
import { LoggedUserViewModel } from "../view-models/TokenViewMode";

@Service()
export class UserService {
    @InjectRepository(User)
    private repo: Repository<User>;

    public getAll(): Promise<User[]> {
      return this.repo.find();
    }

    public get(id: string): Promise<User> {
      const objId = ObjectID.createFromHexString(id);
      return this.repo.findOne(objId);
    }

    public create(user: User): Promise<User> {
      return this.repo.save(user);
    }

    public register(user: RegisterViewModel): Promise<LoggedUserViewModel> {
      const entity: User = new User(
        user.email, user.firstName, user.lastName, user.age);
      entity.passwordHash = x2(user.password);

      return this.repo.save(entity)
        .then(registered => {
          registered.token = x2(`${registered.email}${registered.passwordHash}`);
          return this.repo.save(registered)
        })
        .then(saved => new LoggedUserViewModel(
          saved.token, saved.firstName, saved.lastName, saved.income));
    }

    public login(loginVm: LoginViewModel): Promise<LoggedUserViewModel> {
      return this.repo.findOne({ 
        email: loginVm.email,
        passwordHash: x2(loginVm.password) 
        }).then((u: User) => {
          if(!u.token) {
            u.token = x2(`${u.email}${u.passwordHash}`);
            return this.repo.save(u);
          } else {
            return Promise.resolve(u);
          }
        }).then(u => Promise.resolve(new LoggedUserViewModel(
          u.token, u.firstName, u.lastName, u.income)));

    }

    public updateIncome(user: User, income: number): Promise<User> {
      user.income = income;
      return this.create(user);
    }

    public delete(id: string): Promise<DeleteResult> {
      const objId = ObjectID.createFromHexString(id);
      return this.repo.delete({ id: objId })
    }
}