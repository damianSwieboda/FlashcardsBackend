import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import UserSchema from 'src/user/user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class AuthModule {}
