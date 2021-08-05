import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateJWTMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    //x-token headers
    const token = req.header('x-token');
    if (!token) {
      throw new BadRequestException(`Se necesita un token.`);
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: 'secretWord',
    });

    next();
  }
}
