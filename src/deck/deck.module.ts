import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckService } from './deck.service';
import { DeckResolver } from './deck.resolver';
import DeckSchema from './deck.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }])],
  providers: [DeckService, DeckResolver],
})
export class DeckModule {}
