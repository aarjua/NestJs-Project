import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseService } from 'src/config/database/database.service';
import { SuccessResponseService } from 'src/globalServices/success-response.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,DatabaseService,SuccessResponseService]
})
export class ProductsModule {}
