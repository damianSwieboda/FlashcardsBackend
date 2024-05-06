import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { CardStatuses } from 'src/enums/card-statuses';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';

export type OfficialCardDocument = OfficialCard & Document;

// TODO: link to conversation with AI, about indexes, query efficiency and database structure,
// in card model, in translation object we need to add "expressionAudioReference" and "usageExampleAudioReference",
// in deck model, we need to add "level" property, it will be important durning quering and indexing audio. We will index audio documents like this: all audio docs  (300k of documents) > language (narrowed to 20k of docs) > level (narrowed to 3-4k of docs) > deck (narrowed to 100 docs) > audioDocumentID
// https://chat.openai.com/c/5c1eb99f-62dd-49d5-96f3-e3fa0f42c8c8

@Schema()
export class OfficialCard {
  //TODO: change type to mongoose.Schema.Types.ObjectId
  @Prop({ required: true })
  deckId: string;

  @Prop({
    required: true,
    enum: CardStatuses,
    default: 'Unfinished',
  })
  cardStatus: string;

  @Prop({ required: false })
  imageBuffer?: Buffer;

  @Prop({ required: false })
  imageMimeType?: string;

  @Prop({
    type: [
      {
        language: {
          type: String,
          required: true,
          enum: LanguagesSupportedByGoogleTranslate,
        },
        expression: { type: String, required: true, trim: true },
        usageExample: { type: String, required: false, trim: true },
        _id: false,
      },
    ],
    required: true, // ???
  })
  translations: [
    {
      language: string;
      expression: string;
      usageExample?: string;
      expressionAudioId?: string;
      usageExampleAudioId?: string;
    },
  ];
}

const CardSchema = SchemaFactory.createForClass(OfficialCard);

export default CardSchema;
