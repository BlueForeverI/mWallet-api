import {JsonController, Param, Body, Get, Post, Delete} from 'routing-controllers';

import { User } from '../models/User';
import { Inject } from 'typedi';
import { UserService } from "../services/UserService";
import { DeleteResult } from 'typeorm';

@JsonController('/users')
export class UserController {

   @Inject()
   private service: UserService;

    @Get('/')
    getAll(): Promise<User[]> {
       return this.service.getAll();
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