import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/authentication/auth.service';
import * as nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { SubscriptionService } from 'src/subscription/subscription.service';
import {
  Passwords,
  RegisterUser,
  StripeEvent,
  TypeOfSubscription,
  TypeUser,
  UpdateUserInfo,
} from 'type';

@Injectable()
export class UserService {
  public stripe: Stripe; // Making stripe property public

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    this.stripe = new Stripe(
      'sk_test_51P69JpSFBxjx5nBvnAMARwV1Pb7ani8DBPSbqUYX9wkACH4L3QMimDRpsuaUqwIiIJC43Y2N5lIe73K3Boejg0Sy00BO5NvdRO',
    );
  }

  /* ============================ Internal Use Controllers ============================ */

  /**
   * Finds a user by email
   * @param email - The email address of the user to find
   * @returns Promise<User> - A promise resolving to the user object
   */
  async findUserByEmail(email: string): Promise<TypeUser> {
    try {
      // Find user by email in the database
      return await this.userModel.findOne({ email });
    } catch (error) {
      // Catch any errors and throw NotFoundException
      throw new NotFoundException('User not found');
    }
  }

  /* ============================ Normal User Controllers ============================ */

  /**
   * Create a new user
   * @param user - The user object containing registration details
   * @returns Promise<User> - A promise resolving to the created user object
   */
  async create(user: User): Promise<RegisterUser> {
    try {
      // find  user and throw error if user already exists
      const getUser = await this.userModel.findOne({ email: user.email });
      if (getUser) {
        throw new BadRequestException('User already exists');
      }

      // Check if the password meets the requirements for a strong password
      const passwordRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
      );
      if (!passwordRegex.test(user.password)) {
        throw new BadRequestException(
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
        );
      }

      // Hash the password using bcryptjs library
      user.password = await bcrypt.hash(user.password, 10);

      // Generate token using the AuthService if needed
      const token = await this.authService.generateToken(user);

      user.image =
        'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg';

      // Create a new user object with the hashed password and token
      const createdUser = new this.userModel({
        ...user,
        image: user.image,
        token,
      });

      // Save the user in the database
      await createdUser.save();

      // Return the created user without the password
      return {
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token,
      };
    } catch (err) {
      // Throw BadRequestException if an error occurs
      throw new BadRequestException(err);
    }
  }

  /**
   * Login a user and generate a token
   * @param user - The user object containing login details
   * @returns Promise<User> - A promise resolving to the logged-in user object with a token
   */
  async login(user: User): Promise<User> {
    try {
      // Generate token using the AuthService
      const token = await this.authService.generateToken(user);

      // Update user document in the database with the new token
      await this.userModel.updateOne({ email: user.email }, { token });

      // Return the user object with the updated token
      return { ...user, token };
    } catch (error) {
      // Throw BadRequestException if an error occurs
      throw new BadRequestException(error);
    }
  }

  /**
   * Update user information
   * @param id - The ID of the user to be updated
   * @param user - The updated user object
   * @returns Promise<User> - A promise resolving to the updated user object
   */
  async update(id: string, user: User): Promise<UpdateUserInfo> {
    try {
      // Find and update the user in the database
      const users = await this.userModel.findByIdAndUpdate(
        { _id: id },
        { ...user, image: user.image },
        {
          new: true,
        },
      );
      const { _id, fullName, email, image, isAdmin, token } = users;
      return { _id, fullName, email, image, isAdmin, token };
    } catch (error) {
      // Throw a NotFoundException if the user is not found
      throw new NotFoundException(error);
    }
  }

  /**
   * Delete a user by ID
   * @param id - The ID of the user to be deleted
   * @returns Promise<any> - A promise indicating successful deletion
   */
  async deleteUser(id: string): Promise<string> {
    try {
      // Check if user exists
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Delete the user
      await this.userModel.findByIdAndUpdate({ _id: id }, { isDelete: true });

      return 'User deleted successfully'; // Return success message after deletion
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Change user's password
   * @param id - The ID of the user whose password needs to be changed
   * @param passwords - Object containing old and new passwords
   * @returns Promise<User> - A promise resolving to the updated user object
   */
  async changePassword(id: string, passwords: Passwords): Promise<User> {
    try {
      // Destructure the passwords object
      const { oldPassword, newPassword } = passwords;

      // Find the user by ID
      const user = await this.userModel.findById(id);

      // Check if old password is correct
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        throw new BadRequestException('Password is incorrect');
      }

      // Update the password with the new hashed password
      return await this.userModel.findByIdAndUpdate(
        { _id: id },
        { password: await bcrypt.hash(newPassword, 10) },
        { new: true },
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * Sends an email to the specified email address
   * @param email - The email address to which the email will be sent
   * @returns Promise<string> - A promise indicating the status of email sending
   */
  async sendEmail(email: string): Promise<string> {
    try {
      // Create email message
      const message = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: `VidStream-Hub Web App: Forgot Password`,
        text: `Welcome to VidStream-Hub site.`,
        html: `<p>
                <a href="http://localhost:3000/auth/forgot-password/${email}">Click here</a> to change your password.</p>
                <br/>
                <p>Please do not share this password with anyone.</p>`,
      };

      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_KEY,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send email
      const isSendMail: boolean = await transporter.sendMail(message);

      // Check if email is sent successfully
      if (!isSendMail) {
        throw new NotFoundException('Email not sent');
      }

      return 'Email sent successfully';
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Resets the password for the user with the specified email address
   * @param email - The email address of the user
   * @param password - The new password
   * @returns Promise<string> - A promise indicating the status of password reset
   */
  async forgotPassword(email: string, password: string): Promise<string> {
    try {
      // Find user by email
      const user = await this.userModel.findOne({ email });

      // If user not found, throw NotFoundException
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Update user's password
      await this.userModel.findByIdAndUpdate(
        { _id: user._id },
        { password: await bcrypt.hash(password, 10) },
      );

      return 'Password updated successfully';
    } catch (error) {
      // Catch any errors and throw NotFoundException
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Retrieves the array of liked movies for the user with the specified ID
   * @param id - The ID of the user
   * @returns Promise<string[]> - A promise resolving to an array of liked movie IDs
   */
  async getAllLikedMovies(id: string): Promise<string[]> {
    try {
      // Find the user by ID and populate the 'likedMovies' field
      const user = await this.userModel.findById(id).populate('likedMovies');

      // If user is found, return the array of liked movie IDs
      if (user) {
        return user.likedMovies;
      } else {
        // If user is not found, throw NotFoundException
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      // Catch any errors and throw NotFoundException
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Adds a movie to the user's liked movies list
   * @param id - The ID of the user
   * @param movieId - The ID of the movie to be added to liked movies
   * @returns Promise<string> - A promise indicating the status of adding movie to liked movies
   */
  async addToLikedMovies(id: string, movieId: string): Promise<string> {
    try {
      // Find the user by ID
      const user = await this.userModel.findById(id);

      // Check if the movie is already liked
      if (user.likedMovies.includes(movieId)) {
        throw new BadRequestException('Movie already liked');
      }

      // Add the movie to liked movies
      user.likedMovies.push(movieId);
      await user.save();

      return 'Movie added to liked movies successfully';
    } catch (error) {
      // Catch any errors and throw BadRequestException
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Removes a movie from the user's liked movies list
   * @param id - The ID of the user
   * @param movieId - The ID of the movie to be removed from liked movies
   * @returns Promise<User> - A promise resolving to the updated user object
   */
  async removeFromLikedMovies(id: string, movieId: string): Promise<string> {
    try {
      // Find the user by ID
      const user = await this.userModel.findById(id);

      // Check if the movie is not liked
      if (!user.likedMovies.includes(movieId)) {
        throw new BadRequestException('Movie not liked');
      }

      // Remove the movie from liked movies
      await this.userModel.findByIdAndUpdate(
        { _id: id },
        { $pull: { likedMovies: movieId } },
        { new: true },
      );

      return 'Unliked movie successfully';
    } catch (error) {
      // Catch any errors and throw NotFoundException
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Deletes all liked movies from a user's profile based on their ID.
   * @param id - The ID of the user whose liked movies should be deleted.
   * @returns A string indicating the result of the operation.
   * @throws NotFoundException if there is an error during the update process.
   */
  async deleteAllLikedMovies(id: string): Promise<string> {
    try {
      // Update the user document to set the likedMovies array to an empty array
      await this.userModel.findByIdAndUpdate({ _id: id }, { likedMovies: [] });
      // If update is successful, return a success message
      return 'All liked movies deleted successfully';
    } catch (error) {
      // If an error occurs during the update, throw a NotFoundException
      throw new NotFoundException('Failed to delete liked movies');
    }
  }

  /* ======================= Admin Controller ======================= */

  /**
   * Finds a user in the database based on their email address.
   * @param email - The email address of the user to find.
   * @returns A User object representing the found user.
   * @throws NotFoundException if the user with the given email is not found.
   */
  async findOne(email: string): Promise<User> {
    try {
      // Query the database to find a user by email
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      // If an error occurs during retrieval, throw a NotFoundException
      throw new NotFoundException('User not found');
    }
  }

  /**
   * Retrieves all users from the database who are not admins.
   * @returns An array of User objects representing non-admin users.
   * @throws NotFoundException if there is an error during retrieval.
   */
  async getAllUsers(): Promise<User[]> {
    try {
      // Query the database to find all non-admin users
      return await this.userModel.find({ isAdmin: false });
    } catch (error) {
      // If an error occurs during retrieval, throw a NotFoundException
      throw new NotFoundException('Failed to retrieve users');
    }
  }

  /**
   * Deletes a user by ID from the database.
   * @param id - The ID of the user to delete.
   * @returns A string indicating the result of the deletion operation.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async deleteUserById(id: string): Promise<string> {
    try {
      // Attempt to delete the user by ID
      await this.userModel.findByIdAndUpdate({ _id: id }, { isDelete: true });
      // If deletion is successful, return a success message
      return 'User deleted successfully';
    } catch (error) {
      // If an error occurs during deletion, throw a NotFoundException
      throw new NotFoundException('User not found or deletion failed');
    }
  }

  /* ======================= Payment Controller ======================= */

  /**
   * Initiates the payment process and creates a subscription for the user
   * @param id - The ID of the user
   * @param price - The price of the subscription plan
   * @returns Promise<string> - A promise resolving to the URL for the payment session
   */
  async myPaymentServiceStart(id: string, price: number): Promise<string> {
    try {
      // Find the user by ID and populate the 'subscriptions' field
      const user = await this.userModel.findById(id).populate('subscriptions');

      // Define plan IDs for different subscription levels
      const [Basic, Standard, Premium] = [
        'price_1P8MuaSFBxjx5nBvtkpuR02W',
        'price_1P8MuzSFBxjx5nBvTLydzRyf',
        'price_1P8MvuSFBxjx5nBvnmWS2jW8',
      ];

      let planId = null;
      // Determine the plan ID based on the price
      if (price === 1) planId = Basic;
      if (price === 3) planId = Standard;
      if (price === 9) planId = Premium;

      if (price !== 0 && user) {
        // Ensure user exists before accessing its properties

        // Create a new payment session with Stripe
        const session = await this.stripe.checkout.sessions.create({
          customer_email: String(user.email),
          client_reference_id: String(user._id), // Ensure _id is converted to string
          mode: 'subscription',
          payment_method_types: ['card'],
          line_items: [
            {
              price: planId,
              quantity: 1,
            },
          ],
          success_url: `http://localhost:3000/payment-success`,
          cancel_url: `http://localhost:3000/dashboard/subscriptions`,
        });

        // Create a new subscription and update the user's subscriptions
        const { _id } = await this.subscriptionService.createSubscription(
          price,
          id,
          session.id,
          planId,
        );
        user.subscriptions = _id;
        await user.save();

        return session.url; // Return the URL for the payment session
      }
    } catch (error) {
      // Catch any errors and throw a NotFoundException
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Handles incoming Stripe webhook events
   * @param request - The incoming request object
   * @param payload - The payload of the webhook event
   * @returns object - An object indicating the status of the webhook handling
   */
  async handleStripeWebhook(
    event: StripeEvent,
  ): Promise<{ status: string; message?: string }> {
    try {
      // Handle specific events
      switch (event.type.toString()) {
        case 'checkout.session.completed':
          const paymentIntent = event.data.object;
          // Handle payment success logic here
          const currentUser = await this.userModel.findById(
            paymentIntent.client_reference_id,
          );
          const subscriptionDataStore = await this.subscriptionService.findById(
            currentUser.subscriptions,
          );
          // Get the current date

          const currentDate = new Date();

          let futureDate;

          // Add month to the current date
          if (subscriptionDataStore.planType === 'Basic') {
            futureDate = new Date(
              currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
            );
          } else if (subscriptionDataStore.planType === 'Standard') {
            futureDate = new Date(
              currentDate.getTime() + 90 * 24 * 60 * 60 * 1000,
            );
          } else if (subscriptionDataStore.planType === 'Premium') {
            futureDate = new Date(
              currentDate.getTime() + 365 * 24 * 60 * 60 * 1000,
            );
          }

          if (subscriptionDataStore) {
            const updatedSubscription = {
              ...subscriptionDataStore._doc,
              planStartDate: paymentIntent.created,
              planEndDate: futureDate,
              planStatus: paymentIntent.payment_status,
            };
            await this.subscriptionService.updateSubscription(
              currentUser.subscriptions,
              updatedSubscription,
            );
          }
          break;
        case 'payment_intent.payment_failed':
          const failedPaymentIntent = event.data.object;
          // Handle payment failure logic here
          throw new Error('Payment failed');
        // Handle other event types as needed
        default:
          console.log(`Unhandled event type: ${event.type}`);
          break;
      }

      // Return a success response to Stripe
      return { status: 'success' };
    } catch (error) {
      // Catch any errors and log them
      console.log('Webhook signature verification failed.', error);
      // Return an error response
      return {
        status: 'error',
        message: 'Webhook signature verification failed',
      };
    }
  }

  /**
   * Handles user payment
   * @param id - The ID of the user
   * @param payload - The payload of the payment
   * @returns object - An object indicating the status of the payment
   */
  async getPaymentInformation(id: string): Promise<TypeOfSubscription | null> {
    const user = await this.userModel.findById(id).populate('subscriptions');
    if (user.subscriptions === null || user.subscriptions === undefined) {
      return null;
    }
    const currentDate = new Date().getTime();
    const subscription = await this.subscriptionService.findById(
      user.subscriptions,
    );
    if (currentDate > new Date(subscription.planEndDate).getTime()) {
      await this.subscriptionService.updateSubscription(user.subscriptions, {
        ...subscription._doc,
        planStatus: 'unpaid',
      });
      return null;
    }
    return subscription;
  }
}
