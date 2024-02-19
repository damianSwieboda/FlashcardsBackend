import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SupportedLanguages } from 'src/enums/suported-languages';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ required: true })
  deckId: string;

  @Prop({ default: true })
  isOfficial: boolean;

  @Prop({
    type: [
      {
        language: { type: String, required: true, enum: SupportedLanguages },
        word: { type: String, required: true },
        usageExample: { type: String, required: false },
        _id: false,
      },
    ],
    required: false,
  })
  translations: [
    {
      language: string;
      word: string;
      usageExample?: string;
    },
  ];
}

const CardSchema = SchemaFactory.createForClass(Card);

export default CardSchema;
