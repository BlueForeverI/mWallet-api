import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { Type } from 'routing-controllers/node_modules/class-transformer';
import { IsNotEmpty } from "routing-controllers/node_modules/class-validator";

@Entity()
export class Category {
  @ObjectIdColumn()
  @Type(() => String)
  id!: ObjectID;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  icon?: string;
}