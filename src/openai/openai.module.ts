import { Module } from '@nestjs/common';
// import { AiResolver } from './ai.resolver';
import { OpenAiService } from './openai.service';

@Module({
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
