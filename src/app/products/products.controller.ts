import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product-dto';
import { JwtAuthGuard } from 'src/middleware/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.productService.findAll(pageNumber, limitNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  FindOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get(':id/get_test_error')
  getError() {
    throw new HttpException('This is a test error', HttpStatus.BAD_REQUEST);
  }
}
