import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeUser } from 'type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: TypeUser | any): string {
    return this.jwtService.sign(user);
  }
}
