import {JsonController, Param, Body, Get, Post, Delete, Authorized} from 'routing-controllers';

import { User } from '../models/User';
import { Inject } from 'typedi';
import { UserService } from "../services/UserService";
import { DeleteResult } from 'typeorm';
import { ResponseSchema } from 'routing-controllers-openapi';
import { LoginViewModel } from '../view-models/LoginViewModel';
import { TokenViewModel } from '../view-models/TokenViewMode';
import { RegisterViewModel } from '../view-models/RegisterViewModel';

@JsonController('/users')
export class UserController {

   @Inject()
   private service: UserService;

    @Authorized()
    @Get('/')
    @ResponseSchema(User, { isArray: true })
    getAll(): Promise<User[]> {
       return this.service.getAll();
    }

    @Get('/:id')
    @ResponseSchema(User)
    getById(@Param('id') id: string): Promise<User> {
      return this.service.get(id);
    }

    @Post('/')
    create(@Body() user: User): User {
      return this.service.create(user);
    }

    @Post('/login')
    login(@Body() loginViewModel: LoginViewModel): Promise<TokenViewModel> {
      return this.service.login(loginViewModel);
    }

    @Post('/register')
    register(@Body() registerViewModel: RegisterViewModel): Promise<User> {
      return this.service.register(registerViewModel);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<DeleteResult> {
      return this.service.delete(id);
    }

}