import { Injectable, NestMiddleware, Put, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'Put') throw new UnauthorizedException();
    else console.log('Common Middleware...');
    next();
  }
}
