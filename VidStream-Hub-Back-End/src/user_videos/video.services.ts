import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Videos, VideosDocument } from './video.entity';
import { UserService } from 'src/user_information/user.service';
import { TypeVideos } from 'type';

@Injectable()
export class VideoServices {
  constructor(
    @InjectModel(Videos.name)
    private readonly videoModel: Model<VideosDocument>,
    private readonly userService: UserService,
  ) {}

  /**
   * This method get all based on user video
   * @param userId This user userId to find the user which user video
   * @returns Promise<Videos[]> - A promise resolving to an array of videos
   */
  async getAllPrivateVideo(userId: string) {
    try {
      return await this.videoModel.find({ user_id: userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * This method get all videos
   * @returns Promise<Videos[]> - A promise resolving to an array of videos
   */
  async getAllVideos() {
    try {
      return await this.videoModel.find({ isPublic: true });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method get video by id
   * @param _id This is video id to find in mongodb is given by default
   * @returns Promise<Videos> - A promise resolving to a video to finding from the database
   */
  async getVideoById(_id: string) {
    try {
      return await this.videoModel.findById({ _id }).populate('user_id');
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method upload video
   * @param email This is user email is user which upload the video
   * @param VideoInfo This is video information of objcet
   * @returns Promise<string> - A promise resolving to a string if video is uploaded successfully
   */
  async uploadVideoInfo(email: string, VideoInfo: TypeVideos) {
    try {
      const { title, description, url, isPublic } = VideoInfo;

      // find user form the user service by email address.
      const user = await this.userService.findUserByEmail(email);

      // check if user exist or not if not throw error
      if (!user) {
        throw new Error('user not found');
      }

      // save video in database and return
      await new this.videoModel({
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
   * This method is used to update the video information
   * @param video_id This is video id it is alrady exist on the video database
   * @param VideoInfo This is video updated information
   * @returns Promise<string> if video is upadated sucessfully
   */
  async updateVideoInfo(video_id: string, VideoInfo: TypeVideos) {
    try {
      const { title, description, url, isPublic } = VideoInfo;

      // update video by video id
      const video = await this.videoModel.findByIdAndUpdate(
        { _id: video_id },
        { $set: { title, description, url, isPublic } },
      );
      await video.save();
      return 'video updated successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * This method is used to delete the user video by id
   * @param user_email This is current user logged in email to find which user in delete
   * @param video_id This is mongodb database video id to identify the perticular video
   * @returns Promise<Videos> - A promise resolving to a video to delete
   */
  async deleteVideoInfo(user_email: string, video_id: string) {
    try {
      const currentUser = await this.userService.findUserByEmail(user_email);
      if (!currentUser) {
        throw new Error('User not found');
      }
      return await this.videoModel.findByIdAndDelete({ _id: video_id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
