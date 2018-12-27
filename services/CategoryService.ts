import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Category } from "../models/Category";
import { Repository } from "typeorm";

@Service()
export class CategoryService {
  @InjectRepository(Category)
  private repo: Repository<Category>;

  getAll(): Promise<Category[]> {
    return this.repo.find();
  }

  create(category: Category) {
    return this.repo.save(category);
  }
}