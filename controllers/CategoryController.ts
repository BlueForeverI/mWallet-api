import { JsonController, Get, Authorized, Post, Body } from "routing-controllers";
import { Inject } from "typedi";
import { CategoryService } from "../services/CategoryService";
import { ResponseSchema } from "routing-controllers-openapi";
import { Category } from "../models/Category";

@JsonController('/categories')
export class CategoryController {
  @Inject()
  private service: CategoryService;

  @Authorized()
  @Get('/')
  @ResponseSchema(Category, { isArray: true })
  getAll(): Promise<Category[]> {
    return this.service.getAll();
  }

  @Authorized()
  @Post('/')
  create(@Body() category: Category): Promise<Category> {
    return this.service.create(category);
  }
}