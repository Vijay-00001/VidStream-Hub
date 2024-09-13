import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { TypeUser } from 'type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Call the parent constructor with options for JWT authentication
    super({
      // Extract JWT token from the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject expired tokens
      ignoreExpiration: false,
      // Secret key for verifying the token's signature
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // Function to validate the payload extracted from the JWT token
  async validate(
    payload: TypeUser,
    done: VerifiedCallback,
  ): Promise<TypeUser | any> {
    // The payload contains the decoded JWT payload
    // You can perform additional checks and operations here if needed
    // For simplicity, we're just returning the payload as is
    return done(null, payload);
  }
}
