import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserDeckService } from './user-deck.service';
import { UserDeckResolver } from './user-deck.resolver';
import UserDeckSchema from './user-deck.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserDeck', schema: UserDeckSchema }])],
  providers: [UserDeckService, UserDeckResolver],
})
export class UserDeckModule {}
