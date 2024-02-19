import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
// import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}
  async signUp(email: string, password: string): Promise<UserDocument> {
    try {
      const user = new this.userModel({ email, password });
      await user.save();
      const userPlainObject = user.toObject();
      userPlainObject._id = userPlainObject._id.toString();
      return userPlainObject;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new ConflictException('Email must be unique');
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException('You provided wrong email or password');
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('You provided wrong email or password');
    }
    const userPlainObject = user.toObject();
    userPlainObject._id = user._id.toString();
    return userPlainObject;
  }
}
