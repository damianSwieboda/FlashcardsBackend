import { IsString, IsEmail, IsNotEmpty, Matches, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}$/, {
    message: 'Provide atleast 8 characters, one uppercase one lowercase, and one digit',
  })
  readonly password: string;

  @IsString()
  @IsOptional()
  userName: string;
}
