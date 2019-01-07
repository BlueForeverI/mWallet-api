import {JsonController, Param, Body, Get, Post, Delete, Authorized, CurrentUser, Put} from 'routing-controllers';

import { User } from '../models/User';
import { Inject } from 'typedi';
import { UserService } from "../services/UserService";
import { DeleteResult } from 'typeorm';
import { ResponseSchema } from 'routing-controllers-openapi';
import { LoginViewModel } from '../view-models/LoginViewModel';
import { LoggedUserViewModel } from '../view-models/TokenViewMode';
import { RegisterViewModel } from '../view-models/RegisterViewModel';
import { UpdateIncomeViewModel } from '../view-models/UpdateIncomeViewModel';

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
    create(@Body() user: User): Promise<User> {
      return this.service.create(user);
    }

    @Post('/login')
    login(@Body() loginViewModel: LoginViewModel): Promise<LoggedUserViewModel> {
      return this.service.login(loginViewModel);
    }

    @Post('/register')
    register(@Body() registerViewModel: RegisterViewModel): Promise<LoggedUserViewModel> {
      return this.service.register(registerViewModel);
    }

    @Put('/updateIncome')
    updateIncome(@Body() incomeVm: UpdateIncomeViewModel, @CurrentUser() user?: User) {
      return this.service.updateIncome(user, incomeVm.income);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<DeleteResult> {
      return this.service.delete(id);
    }

}