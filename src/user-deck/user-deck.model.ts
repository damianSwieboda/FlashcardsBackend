import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';

import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';

export type UserDeckDocument = UserDeck & Document;

// TODO: link to conversation with AI, about indexes, query efficiency and database structure,
// in card model, in translation object we need to add "expressionAudioReference" and "usageExampleAudioReference",
// in deck model, we need to add "level" property, it will be important durning quering and indexing audio. We will index audio documents like this: all audio docs  (300k of documents) > language (narrowed to 20k of docs) > level (narrowed to 3-4k of docs) > deck (narrowed to 100 docs) > audioDocumentID
// https://chat.openai.com/c/5c1eb99f-62dd-49d5-96f3-e3fa0f42c8c8

@Schema()
export class UserDeck {
  //TODO: change type to mongoose.Schema.Types.ObjectId
  @Prop()
  deckOwner: string;

  @Prop({
    required: true,
    minlength: 1,
    maxlength: 40,
    trim: true,
    validate: {
      validator: (value: string) => value.trim().length > 0,
      message: 'Name cannot be empty.',
    },
  })
  name: string;

  @Prop({
    required: false,
    trim: true,
    maxlength: 1000,
  })
  description: string;

  @Prop({
    required: true,
    trim: true,
    enum: LanguagesSupportedByGoogleTranslate, // TODO: change to "supportedLanguages" once the final list is complete
  })
  firstLanguage: string;

  @Prop({
    required: true,
    trim: true,
    enum: LanguagesSupportedByGoogleTranslate, // TODO: change to "supportedLanguages" once the final list is complete
  })
  secondLanguage: string;

  //todo: add maximum length for array, so app will not crash after reaching max data weight
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    default: [],
  })
  cards: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}
const UserDeckSchema = SchemaFactory.createForClass(UserDeck);

export default UserDeckSchema;
