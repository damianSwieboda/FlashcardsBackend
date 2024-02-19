import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.model';

Injectable();
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async findOne(_id: string): Promise<UserDocument> {
    const user = await this.userModel.findById({ _id }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userPlainObject = user.toObject();
    userPlainObject._id = user._id.toString();
    return userPlainObject;
  }

  async deleteOne(_id: string) {
    console.log(_id);
    const userDeleted = await this.userModel.findOneAndDelete({ _id }).exec();
    console.log(userDeleted);
    if (!userDeleted) {
      throw 'Someting went wrong. Try again or contanct technical support.';
    }

    return 'Account successfully deleted';
  }

  async updateUser(_id: string, body: any) {
    const propsToUpdate = Object.keys(body);
    const user = await this.userModel.findById({ _id }).exec();

    for (const prop of propsToUpdate) {
      user[prop] = body[prop];
    }
    await user.save();

    return user;
  }
}
