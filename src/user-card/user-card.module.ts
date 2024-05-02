import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserCardResolver } from './user-card.resolver';
import { UserCardService } from './user-card.service';
import UserCardSchema from './user-card.model';
import UserDeckSchema from 'src/user-deck/user-deck.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserCard', schema: UserCardSchema },
      { name: 'UserDeck', schema: UserDeckSchema },
    ]),
  ],
  providers: [UserCardResolver, UserCardService],
})
export class UserCardModule {}
