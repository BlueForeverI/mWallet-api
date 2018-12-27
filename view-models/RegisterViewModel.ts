import { IsNotEmpty, IsPositive, IsEmail } from "routing-controllers/node_modules/class-validator";

export class RegisterViewModel {
    
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    @IsPositive()
    public age: number;

    @IsNotEmpty()
    public password: string
}