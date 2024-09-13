import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthLocalStrategy } from './auth.local';
import { UserModule } from 'src/user_information/user.module';
import { JwtStrategy } from './auth.jwt';

@Module({
  imports: [
    JwtModule.register({
      secretOrKeyProvider: () => process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [AuthService, AuthLocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
