import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/config/database/database.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product-dto';
import { SuccessResponseService } from 'src/globalServices/success-response.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly responseService: SuccessResponseService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productCount = await this.databaseService.product.count();
    const base = 'PRD';
    const prefixLength = 3;
    const productId = `${base}${4000 + productCount + 1}`.padStart(
      prefixLength + 4,
      '0',
    );
    await this.databaseService.product.create({
      data: {
        name: createProductDto.name,
        code: productId,
        price: createProductDto.price,
        quantity: createProductDto.quantity,
        user_id: createProductDto.user_id,
      },
    });
    return this.responseService.handle(
      'success',
      HttpStatus.CREATED,
      'product created successfully',
    );
  }

  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const products = await this.databaseService.product.findMany({
      skip: offset,
      take: limit,
      include: {
        user: true, // This includes the related products in the result
      },
    });

    const totalCount = await this.databaseService.product.count();
    if (products.length)
      return {
        data: products,
        totalCount: totalCount,
        //   totalPages: Math.ceil(totalCount / limit),
        //   currentPage: page,
      };
    else
      return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'Products not found',
      );
  }

  async findOne(id: number) {
    let findProduct = await this.databaseService.product.findUnique({
      where: {
        id,
      },
    });
    if (!findProduct)
      return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'Product not found',
      );
    else
      return this.responseService.handle(
        'success',
        HttpStatus.FOUND,
        'Product found',
        findProduct,
      );
  }

  async update(id: number, updateProductsDto: UpdateProductDto) {
    let findProduct = await this.databaseService.product.findUnique({
      where: {
        id,
      },
    });
    if (!findProduct)
      return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'Product not found',
      );
    let upadteProduct = this.databaseService.user.update({
      where: {
        id,
      },
      data: updateProductsDto,
    });
    if (upadteProduct)
      return this.responseService.handle(
        'success',
        HttpStatus.FOUND,
        'product updated successfully',
      );
  }

  async remove(id: number) {
    await this.databaseService.product.delete({
      where: {
        id,
      },
    });
    return this.responseService.handle(
      'success',
      HttpStatus.FOUND,
      'product deleted successfully',
    );
  }
}
