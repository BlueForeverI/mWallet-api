import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../models/User";
import { ObjectID } from 'mongodb';
import { Repository, DeleteResult } from "typeorm";
import { plainToClass } from "class-transformer";

@Service()
export class UserService {
    @InjectRepository(User)
    private repo: Repository<User>;

    public getAll(): Promise<User[]> {
      return this.repo.find()
        .then(users => Promise.resolve(users.map(u => plainToClass(User, u))));
    }

    public get(id: string): Promise<User> {
      const objId = ObjectID.createFromHexString(id);
      return this.repo.findOne(objId)
        .then(user => Promise.resolve(plainToClass(User, user)));
    }

    public create(user: User): User {
      return plainToClass(User, this.repo.save(user));
    }

    public delete(id: string): Promise<DeleteResult> {
      const objId = ObjectID.createFromHexString(id);
      return this.repo.delete({ id: objId })
    }
}