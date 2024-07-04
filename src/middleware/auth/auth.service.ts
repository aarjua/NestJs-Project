import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createToken(user: any) {
    console.log('create user token++', user);
    const payload = { email: user.email, id: user.id, roles: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
