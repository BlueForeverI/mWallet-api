import {JsonController, Param, Body, Get, Post, Delete} from 'routing-controllers';

import { User } from '../models/User';
import { Inject } from 'typedi';
import { UserService } from "../services/UserService";
import { DeleteResult } from 'typeorm';
import { ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/users')
export class UserController {

   @Inject()
   private service: UserService;

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

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<DeleteResult> {
      return this.service.delete(id);
    }

}