import { Module } from '@nestjs/common';
import { GoogleTranslateService } from './google-translate.service';
import { GoogleTranslateResolver } from './google-translate.resolver';
import { CardModule } from '../card/card.module';

@Module({
  imports: [CardModule],
  providers: [GoogleTranslateService, GoogleTranslateResolver],
})
export class GoogleTranslateModule {}
