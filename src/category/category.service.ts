import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from 'src/prisma/prisma.service';
import CategoryNotFoundException from './exceptions/NotFoundException';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { PrismaError } from 'src/utils/prismaError';

@Injectable()
export default class CategoryService {
  constructor(private readonly prismService: PrismaService) {}

  async getAllCategory() {
    return this.prismService.category.findMany();
  }

  async getCategoryById(id: number) {
    const category = await this.prismService.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    return category;
  }

  async createCategory(category: CreateCategoryDto) {
    return this.prismService.category.create({
      data: category,
    });
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    try {
      return await this.prismService.category.update({
        data: {
          ...category,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesnExist
      ) {
        throw new CategoryNotFoundException(id);
      }
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      return this.prismService.category.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesnExist
      ) {
        throw new CategoryNotFoundException(id);
      }
      throw error;
    }
  }
}
