import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { LanguagesSupportedByGoogleTextTranslate } from 'src/enums/suported-languages';

export type DeckDocument = Deck & Document;

@Schema()
export class Deck {
  //todo change type to mongoose.Schema.Types.ObjectId
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
    enum: LanguagesSupportedByGoogleTextTranslate, // TODO: change to "supportedLanguages" once the final list is complete
  })
  firstLanguage: string;

  @Prop({
    required: true,
    trim: true,
    enum: LanguagesSupportedByGoogleTextTranslate, // TODO: change to "supportedLanguages" once the final list is complete
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
const DeckSchema = SchemaFactory.createForClass(Deck);

export default DeckSchema;
