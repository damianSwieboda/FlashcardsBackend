import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OfficialDeckService } from './official-deck.service';
import { OfficialDeckResolver } from './official-deck.resolver';
import OfficialDeckSchema from './official-deck.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'OfficialDeck', schema: OfficialDeckSchema }])],
  providers: [OfficialDeckService, OfficialDeckResolver],
})
export class OfficialDeckModule {}
