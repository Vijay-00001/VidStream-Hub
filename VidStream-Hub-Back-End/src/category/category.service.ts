import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category, CategoryDocument } from './category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TypeOfCategory } from 'type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  //============================= PUBLIC CATEGORY API ============================

  //This method return all category
  // This method end point is ..…
  // @Get('/api/category')
  async getAllCategory(): Promise<TypeOfCategory[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //This method return a category based on id
  // This method end point is ..：
  // @Get('/api/category/:id')
  async getCategoryById(id: string): Promise<TypeOfCategory> {
    try {
      const category = await this.categoryModel.findById(id).exec();
      if (!category) {
        throw new Error('Not Found');
      }
      return category;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //============================= ADMIN CATEGORY API ============================

  //This method create a category
  // This method end point is ..
  // @Post('/api/admin/category')
  async createCategory(data: TypeOfCategory): Promise<TypeOfCategory> {
    try {
      return await this.categoryModel.create(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //This method update a category
  // This method end point is ..
  // @Put('/api/admin/category/:id')
  async updateCategory(id: string, title: object): Promise<TypeOfCategory> {
    try {
      return await this.categoryModel.findByIdAndUpdate(
        { _id: id },
        { $set: title },
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //This method delete a category
  // This method end point is ..
  // @Delete('/api/admin/category/:id')
  async deleteCategory(id: string): Promise<string> {
    try {
      const isCategoryExist = await this.categoryModel.findByIdAndDelete({
        _id: id,
      });
      if (!isCategoryExist) {
        throw new Error('Category Not Found');
      }
      return 'Category deleted successfully';
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //This method delete all category
  // This method end point is ..
  // @Delete('/api/admin/category')
  async deleteAllCategory(): Promise<string> {
    try {
      await this.categoryModel.deleteMany({});
      return 'All Category deleted successfully';
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
