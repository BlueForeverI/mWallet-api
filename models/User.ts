import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";
import { Expose, Exclude, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity()
export class User {

    @ObjectIdColumn()
    @Type(() => String)
    id!: ObjectID;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsPositive()
    age: number;

    constructor(firstName: string, lastName: string, age: number) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
    }
}
