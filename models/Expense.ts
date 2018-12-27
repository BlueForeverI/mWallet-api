import "reflect-metadata"; // this shim is required
import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { Type } from 'routing-controllers/node_modules/class-transformer';
import { IsNotEmpty, IsPositive } from "routing-controllers/node_modules/class-validator";

@Entity()
export class Expense {
  @ObjectIdColumn()
  @Type(() => String)
  id!: ObjectID;

  @Column()
  @Type(() => Date)
  date: Date;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @Column()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsNotEmpty()
  categoryId: string;
}