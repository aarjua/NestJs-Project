import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { SuccessResponseService } from 'src/globalServices/success-response.service';
import { AuthService } from 'src/middleware/auth/auth.service';

@Injectable()
export class LoginService {
  constructor(
    private databaseService: DatabaseService,
    private readonly authService: AuthService,
    private responseService: SuccessResponseService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: username,
        status: true,
      },
    });
    if (!user)
     return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'user not found',
      );
    if (user && user.password === pass) {
      // Use hashed password comparison in production
      const { password, ...result } = user;
      let data = await this.authService.createToken(result);
      console.log(data)
      return this.responseService.handle(
        'success',
        HttpStatus.FOUND,
        'login successfull',
        data,
      );
    } else {
     return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'wrong password',
      );
    }
    
  }
}
