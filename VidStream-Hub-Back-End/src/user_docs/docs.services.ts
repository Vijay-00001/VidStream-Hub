import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Docs, DocsDocument } from './docs.entity';
import { UserService } from 'src/user_information/user.service';
import { Model } from 'mongoose';

@Injectable()
export class DocsService {
  constructor(
    @InjectModel(Docs.name)
    private readonly docsModel: Model<DocsDocument>,
    private readonly userService: UserService,
  ) {}

  /**
   * This method get all videos
   * @returns Promise<Docs[]> - A promise resolving to an array of videos
   */
  async getAllPrivateDocs(userId: string): Promise<Docs[]> {
    try {
      return await this.docsModel.find({ user_id: userId });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getAllDocs(): Promise<Docs[]> {
    try {
      return await this.docsModel.find({ isPublic: true });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getDocById(_id: string): Promise<Docs> {
    try {
      return await this.docsModel.findById({ _id }).populate('user_id');
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async uploadDocInfo(email: string, DocInfo: Docs) {
    try {
      const { title, description, url, isPublic } = DocInfo;

      // find user form the user service by email address.
      const user = await this.userService.findUserByEmail(email);

      // if user is not exist then throw error
      if (!user) {
        throw new Error('user not found');
      }

      // save video in database and return
      await new this.docsModel({
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

  async updateDocsInfo(doc_id: string, DocInfo: Docs) {
    try {
      const { title, description, url, isPublic } = DocInfo;

      const document = await this.docsModel.findByIdAndUpdate(
        { _id: doc_id },
        { $set: { title, description, url, isPublic } },
      );
      await document.save();
      return 'Document updated successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteDocsInfo(user_email: string, doc_id: string) {
    try {
      const currentUser = await this.userService.findUserByEmail(user_email);

      // if User is not exist then throw error
      if (!currentUser) {
        throw new Error('User not found');
      }
      return await this.docsModel.findByIdAndDelete({ _id: doc_id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
