import { Module } from '@nestjs/common';
import { AiResolver } from './ai.resolver';
import { AiService } from './ai.service';
import { CardModule } from '../card/card.module';

@Module({
  imports: [CardModule],
  providers: [AiResolver, AiService],
})
export class AiModule {}
