import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { DatabaseService } from './config/database/database.service';
import { ProductsModule } from './app/products/products.module';
import { AuthModule } from './middleware/auth/auth.module';
import { LoginModule } from './app/login/login.module';
import { SuccessResponseService } from './globalServices/success-response.service';
import { HttpExceptionFilter } from './globalServices/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';


@Module({
  imports: [UsersModule, ProductsModule, AuthModule, LoginModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, SuccessResponseService,{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter, // Applying the filter at the module level
  },],
  exports: [DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('users'); // for whole route
    // consumer.apply(LoggerMiddleware).forRoutes(ProductsController); // for whole controller
    // consumer.apply(TryCatchMiddleware).forRoutes('*'); // for All Routes
    // consumer
    //   .apply(LoggerMiddleware)
    // .forRoutes({ path: 'users', method: RequestMethod.GET }); // for perticular controller method
  }
}
