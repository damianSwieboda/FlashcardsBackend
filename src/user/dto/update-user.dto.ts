import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/auth/dto';

export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ['email'] as const)) {}
