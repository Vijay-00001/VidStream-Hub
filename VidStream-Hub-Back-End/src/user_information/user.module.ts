import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { UserController } from './user.controller';
import { MoviesModule } from 'src/movies_information/movies.module';
import { AdminController } from './admin.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  imports: [
    // Import the User model and associate it with the UserSchema
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Import other modules with forwardRef to resolve circular dependencies
    forwardRef(() => AuthModule),
    forwardRef(() => MoviesModule),
    forwardRef(() => CloudinaryModule),
    forwardRef(() => SubscriptionModule),
  ],
  controllers: [AdminController, UserController], // Declare controllers
  providers: [UserService], // Declare providers
  exports: [UserService], // Export UserService for dependency injection
})
export class UserModule {}
