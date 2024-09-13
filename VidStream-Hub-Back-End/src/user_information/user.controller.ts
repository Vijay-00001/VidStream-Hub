import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CustomException } from 'src/exceptions/custom.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RoleGuard } from 'src/authentication/auth.rolegaurd';
import {
  MovieId,
  Passwords,
  RegisterUser,
  StripeEvent,
  TypeOfSubscription,
  TypeOfVideos,
  UpdateUserInfo,
} from 'type';

@Controller('/api/user')
@UseFilters(CustomException)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**
   * Endpoint to get all users
   * @returns Promise<User[]> - A promise resolving to the list of users
   */
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getAllUsers(): Promise<User[]> {
    // Call the userService to retrieve all users
    return this.userService.getAllUsers();
  }

  /**
   * Endpoint to register a new user
   * @param user - The user object containing registration details
   * @returns Promise<User> - A promise resolving to the created user object
   */
  @Post('/register')
  @UsePipes(new ValidationPipe())
  async createUser(@Body(ValidationPipe) user: User): Promise<RegisterUser> {
    // Call the userService to create a new user
    return this.userService.create(user);
  }

  /**
   * Endpoint to login a user
   * @param req - The request object containing user details added by the AuthGuard
   * @returns Promise<User> - A promise resolving to the result of user login
   */
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async loginUser(@Req() req): Promise<User> {
    // Call the userService to login the user
    return this.userService.login(req.user);
  }

  /**
   * Endpoint to upload a file
   * @param file - The file uploaded by the user
   * @returns Promise<string> - A promise resolving to an object containing the secure URL of the uploaded file
   */
  @Post('/upload')
  @UseGuards(AuthGuard('jwt')) // Apply JWT authentication guard
  @UseInterceptors(FileInterceptor('file')) // Use file interceptor to handle file upload
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    // Call the cloudinaryService to upload the file
    const secureUrl = await this.cloudinaryService.uploadFile(file);
    // Return an object containing the secure URL of the uploaded file
    return await secureUrl.secure_url;
  }

  /**
   * Endpoint to update a user's information
   * @param req - The request object containing user details from the JWT token
   * @param user - The updated user object
   * @returns Promise<User> - A promise resolving to the updated user object
   */
  @Put('/')
  @UseGuards(AuthGuard('jwt')) // Apply JWT authentication guard
  async updateUser(@Req() req, @Body() user: User): Promise<UpdateUserInfo> {
    // Call the userService to update the user
    return this.userService.update(req.user._id, user);
  }

  /**
   * Endpoint to change user's password
   * @param req - The request object containing user details from the JWT token
   * @param Passwords - The object containing old and new passwords
   * @returns Promise<User> - A promise resolving to the updated user object
   */
  @Put('/change-password')
  @UseGuards(AuthGuard('jwt')) // Apply JWT authentication guard
  async changePassword(
    @Req() req,
    @Body() Passwords: Passwords,
  ): Promise<User> {
    // Call the userService to change the user's password
    return this.userService.changePassword(req.user._id, Passwords);
  }

  /**
   * Deletes the currently authenticated user.
   * @param req - The request object containing user information.
   * @returns A Promise with the result of the deletion operation.
   */
  @Delete('/')
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT authentication
  async deleteUser(@Req() req): Promise<string> {
    // Extract the user ID from the request
    const userId = req.user._id;
    // Call the userService to delete the user
    return await this.userService.deleteUser(userId);
  }

  /**
   * Retrieves the liked movies of the currently authenticated user.
   * @param req - The request object containing user information.
   * @returns A Promise with an array of liked movie IDs.
   */
  @Get('/likedMovies')
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT authentication
  async getLikedMovies(@Req() req): Promise<string[]> {
    // Extract the user ID from the request
    const userId = req.user._id;
    // Call the userService to get all liked movies for the user
    const likedMovies = await this.userService.getAllLikedMovies(userId);
    // Return the array of liked movie IDs
    return likedMovies;
  }

  /**
   * Adds a movie to the liked movies list of the currently authenticated user.
   * @param req - The request object containing user information.
   * @param movieId - DTO containing the movie ID to be added.
   * @returns A Promise with a success message.
   */
  @Post('/likedMovies')
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT authentication
  async addLikedMovie(@Req() req, @Body() movieId: MovieId): Promise<string> {
    // Extract the user ID from the request
    const userId = req.user._id;
    // Extract the movie ID from the request body
    const movieIdToAdd = movieId.movie_id;
    // Call the userService to add the movie to liked movies
    return await this.userService.addToLikedMovies(userId, movieIdToAdd);
  }

  /**
   * Removes a movie from the liked movies list of the currently authenticated user.
   * @param req - The request object containing user information.
   * @param movieId - The ID of the movie to be removed from the liked movies list.
   * @returns A Promise with a success message.
   */
  @Delete('/likedMovies/:movieId')
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT authentication
  async deleteLikedMovie(
    @Req() req,
    @Param('movieId') movieId: string,
  ): Promise<string> {
    // Extract the user ID from the request
    const userId = req.user._id;
    // Call the userService to remove the movie from liked movies
    return await this.userService.removeFromLikedMovies(userId, movieId);
  }

  /**
   * Deletes all liked movies from the list of the currently authenticated user.
   * @param req - The request object containing user information.
   * @returns A Promise with a success message.
   */
  @Delete('/likedMovies')
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT authentication
  async deleteAllLikedMovies(@Req() req): Promise<string> {
    // Extract the user ID from the request
    const userId = req.user._id;
    // Call the userService to delete all liked movies
    return await this.userService.deleteAllLikedMovies(userId);
  }

  /**
   * Initiates the subscription checkout session for the user.
   * @param req - The request object containing user information.
   * @param priceInfo - The price information for the subscription.
   * @returns The URL of the subscription checkout session.
   */
  @Post('/create-subscription-checkout-session')
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT authentication
  async myPaymentServiceStart(
    @Req() req,
    @Body() priceInfo: { price: number },
  ) {
    const { price } = priceInfo;
    console.log('This is start payment method ===> ', priceInfo);
    // Call the userService to initiate the subscription checkout session
    return this.userService.myPaymentServiceStart(req.user._id, price);
  }

  /**
   * Handles the password reset functionality.
   * @param email - The email address of the user requesting the password reset.
   * @param body - The request body containing the new password.
   * @returns A Promise with a success message indicating that the password has been updated.
   */
  @Put('/forgot-password/:email')
  async forgotPassword(
    @Param('email') email: string,
    @Body() body: { passwords: string },
  ): Promise<string> {
    const { passwords } = body;
    // Call the userService to handle the password reset
    return this.userService.forgotPassword(email, passwords);
  }

  /**
   * Sends an email to the specified email address.
   * @param email - The email address to which the email will be sent.
   * @returns A Promise with a success message indicating that the email has been sent.
   */
  @Post('/send/:email')
  async sendEmail(@Param('email') email: string): Promise<string> {
    // Call the userService to send an email to the specified email address
    return await this.userService.sendEmail(email);
  }

  /**
   * Handles incoming Stripe webhook events
   * @param event This event comes from Stripe webhook and contains information about the payment intent
   * @returns object - An object indicating the status of the webhook handling
   */
  @Post('/payment-service-success-verify')
  async myPaymentServiceSuccess(@Body() event: StripeEvent) {
    return this.userService.handleStripeWebhook(event);
  }

  /**
   * This URL is used to Get payment information of current logged in user
   * @param req This req is which user is current logged in
   * @returns Promise<TypeOfSubscription | null> - A promise resolving to a subscription object or null
   */
  @Get('/get-payment-information')
  @UseGuards(AuthGuard('jwt'))
  async getPaymentInformation(@Req() req): Promise<TypeOfSubscription | null> {
    return await this.userService.getPaymentInformation(req.user._id);
  }
}
