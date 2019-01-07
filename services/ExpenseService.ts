import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Expense } from "../models/Expense";
import { Repository, DeleteResult } from "typeorm";
import { ObjectID, ISODate } from 'mongodb';

import { User } from "../models/User";
import { start } from "repl";

@Service()
export class ExpenseService {
  @InjectRepository(Expense)
  private repo: Repository<Expense>;

  public getAll(user: User, startDate?: Date, endDate?: Date): Promise<Expense[]> {
    let promise = this.repo.find({ userId: user.id.toHexString() });

    if(startDate != null && endDate != null) {
      promise = promise.then(expenses => expenses
        .filter(exp => exp.date >= startDate && exp.date <= endDate))
    }

    return promise;
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