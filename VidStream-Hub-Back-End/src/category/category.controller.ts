import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CustomException } from 'src/exceptions/custom.exception';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/authentication/auth.rolegaurd';
import { TypeOfCategory } from 'type';

@Controller('/api/categories')
@UseFilters(CustomException)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //========================= PUBLIC CONTROLLER ===========================

  // This router return all category
  @Get('/')
  async getAllCategory() {
    const data = await this.categoryService.getAllCategory();
    return data;
  }

  // This router return a category based on id
  // This router take id from url
  @Get('/:id')
  async getCategoryById(
    @Param('id') category_id: string,
  ): Promise<TypeOfCategory> {
    return await this.categoryService.getCategoryById(category_id);
  }

  //========================= ADMIN CONTROLLER ===========================

  // This router is for create category
  // This router take data from body as title
  // And return the created category or string
  @Post('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async createCategory(@Body() data: TypeOfCategory) {
    return await this.categoryService.createCategory(data);
  }

  // This router is for update category
  // This router take id from url
  // And return the updated category or string
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async updateCategory(@Param('id') id: string, @Body() title: object) {
    return await this.categoryService.updateCategory(id, title);
  }

  // This router is for delete category
  // This router take id from url
  // And return the deleted category or string
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }

  // This router is for delete all category
  // And return the string if delete successfull else error
  @Delete('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async deleteAllCategory() {
    return await this.categoryService.deleteAllCategory();
  }
}
