import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { DatabaseService } from 'src/config/database/database.service';
import { LoginController } from './login.controller';
import { AuthModule } from '../../middleware/auth/auth.module';
import { AuthService } from 'src/middleware/auth/auth.service';
import { SuccessResponseService } from 'src/globalServices/success-response.service';


@Module({
  imports:[AuthModule],
  controllers: [LoginController],
  providers: [LoginService,DatabaseService, SuccessResponseService]
})
export class LoginModule {}
