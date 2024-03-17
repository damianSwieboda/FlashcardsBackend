import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import CardSchema from './card.model';
import DeckSchema from 'src/deck/deck.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Card', schema: CardSchema },
      { name: 'Deck', schema: DeckSchema },
    ]),
  ],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
