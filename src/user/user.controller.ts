import {
  Controller,
  Delete,
  Get,
  Patch,
  Session,
  UseGuards,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { currentUser } from './decorators/current-user.decorator';
import { User } from 'src/types/user';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDTO } from './dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller('user')
@UseInterceptors(CurrentUserInterceptor)
@Serialize(UserDTO)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@currentUser() currentUser: User) {
    const user = currentUser;
    return user;
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(@currentUser() currentUser: any, @Session() session: any) {
    const { _id } = currentUser;
    const userDeleted = await this.userService.deleteOne(_id);
    session.userId = null;

    return userDeleted;
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateUser(@Body() body: UpdateUserDTO, @currentUser() currentUser: any) {
    const { _id } = currentUser;

    await this.userService.updateUser(_id, body);
  }
}
