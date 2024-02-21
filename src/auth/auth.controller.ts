import { Body, Controller, Post, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, SignInDTO } from './dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from 'src/user/dto';

@Controller('auth')
@Serialize(UserDTO)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDTO, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signUp(email, password);
    session.userId = user._id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: SignInDTO, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signIn(email, password);
    session.userId = user._id;
    return user;
  }

  @Get('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
    return 'Successfully sign out!';
  }
}
