import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";
import { Expose, Exclude, Transform, Type } from 'class-transformer';

@Entity()
export class User {

    @ObjectIdColumn()
    @Type(() => String)
    id!: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    constructor(firstName: string, lastName: string, age: number) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
    }
}
