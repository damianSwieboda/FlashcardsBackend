import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  _id: string;

  @Expose()
  email: string;
}
