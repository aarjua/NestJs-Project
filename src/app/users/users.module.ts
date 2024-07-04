import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseService } from 'src/config/database/database.service';
import { SuccessResponseService } from 'src/globalServices/success-response.service';


@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService,DatabaseService,SuccessResponseService]
})
export class UsersModule {}
