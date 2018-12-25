import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";
import { Expose, Exclude, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity()
export class User {

    @ObjectIdColumn()
    @Type(() => String)
    id!: ObjectID;

    @Column()
    email: string;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsPositive()
    age: number;

    @Column()
    @Exclude()
    passwordHash?: string;

    @Column()
    @Exclude()
    token?: string;

    constructor(email: string, 
                firstName: string, 
                lastName: string, 
                age: number) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}
