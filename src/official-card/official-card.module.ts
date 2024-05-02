import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OfficialCardService } from './official-card.service';
import { OfficialCardResolver } from './official-card.resolver';
import OfficialCardSchema from './official-card.model';
import OfficialDeckSchema from 'src/official-deck/official-deck.model';
import { OpenAiModule } from 'src/openai/openai.module';
import { GoogleTranslateModule } from 'src/google-translate/google-translate.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OfficialCard', schema: OfficialCardSchema },
      { name: 'OfficialDeck', schema: OfficialDeckSchema },
    ]),
    GoogleTranslateModule,
    OpenAiModule,
  ],
  providers: [OfficialCardService, OfficialCardResolver],
  exports: [OfficialCardService],
})
export class OfficialCardModule {}
