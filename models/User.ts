import {Entity, ObjectIdColumn, ObjectID, Column, Index} from "typeorm";
import { Exclude, Type } from 'routing-controllers/node_modules/class-transformer';

@Entity()
export class User {

  @ObjectIdColumn()
  @Type(() => String)
  id!: ObjectID;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  income: number;

  @Column()
  @Exclude()
  passwordHash?: string;

  @Column()
  @Exclude()
  token?: string;

  constructor(email: string, 
              firstName: string, 
              lastName: string, 
              age: number,
              income: number = 0) {
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.income = income;
  }
}
