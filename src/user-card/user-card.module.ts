import { Module } from '@nestjs/common';
import { UserCardResolver } from './user-card.resolver';
import { UserCardService } from './user-card.service';
import UserCardSchema from './user-card.model';
import DeckSchema from 'src/deck/deck.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserCard', schema: UserCardSchema },
      { name: 'Deck', schema: DeckSchema },
    ]),
  ],
  providers: [UserCardResolver, UserCardService],
})
export class UserCardModule {}
