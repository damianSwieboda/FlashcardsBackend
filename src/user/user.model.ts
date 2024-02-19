import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import validator from 'validator';
import { Date, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email address',
    },
  })
  email: string;

  @Prop({
    required: function () {
      return this.accountProvider === 'Local' ? true : false;
    },
    minlength: 8,
    trim: true,
    maxlength: 1000,
  })
  password: string;

  @Prop({
    required: true,
    default: 'Local',
    validate: {
      validator: (value: string) => ['Local', 'Google', 'Facebook', 'Apple'].includes(value),
    },
  })
  accountProvider: string;

  @Prop({
    required: false,
    default: 'User',
    trim: true,
    minlength: 2,
  })
  userName: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user: UserDocument = this;

  if (user.isModified(this.password)) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      user.password = hashedPassword;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default UserSchema;
