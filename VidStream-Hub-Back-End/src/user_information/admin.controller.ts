import {
  Controller,
  Delete,
  Get,
  Param,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/authentication/auth.rolegaurd';
import { CustomException } from 'src/exceptions/custom.exception';
import { User } from './user.entity';

@Controller('/api/admin')
@UseFilters(CustomException)
@UseGuards(AuthGuard('jwt'), new RoleGuard())
export class AdminController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves all users from the database.
   * @returns A Promise with the array of user data.
   */
  @Get('/')
  async getAllUsers(): Promise<User[]> {
    // Call the userService to fetch all users from the database
    return await this.userService.getAllUsers();
  }

  /**
   * Deletes a user based on the provided user ID.
   * @param user_id - The ID of the user to be deleted.
   * @returns A Promise with the result of the deletion operation.
   */
  @Delete('/:id')
  async deleteUser(@Param('id') user_id: string): Promise<string> {
    // Call the userService to delete the user based on the provided user ID
    return await this.userService.deleteUser(user_id);
  }
}
