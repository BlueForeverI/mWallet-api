import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Expense } from "../models/Expense";
import { Repository, DeleteResult } from "typeorm";
import { ObjectID } from 'mongodb';

import { User } from "../models/User";

@Service()
export class ExpenseService {
  @InjectRepository(Expense)
  private repo: Repository<Expense>;

  public getAll(user: User): Promise<Expense[]> {
    return this.repo.find({ userId: user.id.toHexString() });
  }

  public create(expense: Expense, user: User): Promise<Expense> {
    expense.userId = user.id.toHexString();
    return this.repo.save(expense);
  }

  public delete(id: string): Promise<DeleteResult> {
    const objId = ObjectID.createFromHexString(id);
    return this.repo.delete({ id: objId });
  }
}