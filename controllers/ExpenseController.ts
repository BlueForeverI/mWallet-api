import { JsonController, Authorized, Get, CurrentUser, Post, Body, Delete, Param, QueryParam } from "routing-controllers";
import { Inject } from "typedi";
import { ExpenseService } from "../services/ExpenseService";
import { ResponseSchema } from "routing-controllers-openapi";
import { Expense } from "../models/Expense";
import { User } from "../models/User";
import { DeleteResult } from "typeorm";

@JsonController('/expenses')
export class ExpenseController {
  @Inject()
  private service: ExpenseService;

  @Authorized()
  @Get('/')
  @ResponseSchema(Expense, { isArray: true })
  getAll(@QueryParam('start') startDate?: Date,
         @QueryParam('end') endDate?: Date,
         @CurrentUser() user?: User): Promise<Expense[]> {
    return this.service.getAll(user, startDate, endDate);
  }

  @Authorized()
  @Post('/')
  create(@Body() expense: Expense, @CurrentUser() user?: User): Promise<Expense> {
    return this.service.create(expense, user);
  }

  @Authorized()
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}