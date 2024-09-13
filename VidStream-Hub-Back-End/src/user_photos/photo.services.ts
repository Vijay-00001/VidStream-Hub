import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user_information/user.service';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo.name)
    private readonly photoModel: Model<PhotoDocument>,
    private readonly userService: UserService,
  ) {}

  /**
   * This method get all user own videos
   * @returns Promise<Photo[]> - A promise resolving to an array of videos
   */
  async getAllPrivatePhoto(userId: string): Promise<Photo[]> {
    try {
      return await this.photoModel.find({ user_id: userId });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method is used to get all videos
   * @returns Promise<Photo[]> - A promise resolving to an array of videos
   */
  async getAllPhotos(): Promise<Photo[]> {
    try {
      return await this.photoModel.find({ isPublic: true });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method get video by id
   * @param _id This is video id to find in mongodb is given by default
   * @returns Promise<Photo> - A promise resolving to a video to finding from the database
   */
  async getPhotoById(_id: string): Promise<Photo> {
    try {
      return await this.photoModel.findById({ _id }).populate('user_id');
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method used to upload photo
   * @param email Get the user email from the login user from the front end
   * @param PhotoInfo Get the photo information from the front end
   * @returns Promise<string> if photo is uploaded successfully
   */
  async uploadPhotoInfo(email: string, PhotoInfo: Photo) {
    try {
      const { title, description, url, isPublic } = PhotoInfo;
      const user = await this.userService.findUserByEmail(email);
      const video_id = await new this.photoModel({
        title,
        description,
        url,
        isPublic,
        user_id: user._id,
      }).save();
      return 'video uploaded successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * This method is used to update the photo information
   * @param doc_id This document id to find in mongodb is given by default for update
   * @param PhotoInfo Get the photo information from the front end
   * @returns Promise<string> if photo is updated successfully
   */
  async updatePhotoInfo(doc_id: string, PhotoInfo: Photo) {
    try {
      const { title, description, url, isPublic } = PhotoInfo;
      const photo = await this.photoModel.findByIdAndUpdate(
        { _id: doc_id },
        { $set: { title, description, url, isPublic } },
      );
      await photo.save();
      return 'Photo updated successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param user_email Get the user email form the login user
   * @param photo_id Get the photo id to delete the photo
   * @returns Promise<string> if photo is deleted successfully
   */
  async deletePhotoInfo(user_email: string, photo_id: string) {
    try {
      const currentUser = await this.userService.findUserByEmail(user_email);
      if (!currentUser) {
        throw new Error('User not found');
      }
      return await this.photoModel.findByIdAndDelete({ _id: photo_id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
