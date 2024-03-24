import { Module } from '@nestjs/common';
import { OfficialCardService } from './official-card.service';
import { OfficialCardResolver } from './official-card.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import OfficialCardSchema from './official-card.model';
import DeckSchema from 'src/deck/deck.model';
import { OpenAiModule } from 'src/openai/openai.module';

import { GoogleTranslateModule } from 'src/google-translate/google-translate.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OfficialCard', schema: OfficialCardSchema },
      { name: 'Deck', schema: DeckSchema },
    ]),
    GoogleTranslateModule,
    OpenAiModule,
  ],
  providers: [OfficialCardService, OfficialCardResolver],
  exports: [OfficialCardService],
})
export class OfficialCardModule {}
