import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(
    private loginService: LoginService,
  ) {}

  @Post()
  async login(@Body() body: any) {
    let userlogin= this.loginService.login(body.username, body.password);
    console.log(userlogin)
    return userlogin;
  }
}
