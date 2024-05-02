import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { CardStatuses } from 'src/enums/card-statuses'; // TODO: add and change to UserCardStatuses?
import { PossibleCardCreators } from 'src/enums/possible-card-creators'; // TODO: hardcoded to User here, and App in app module? Only add prop for if was created with AI support?

export type UserCardDocument = UserCard & Document;

@Schema()
export class UserCard {
  //TODO: change type to mongoose.Schema.Types.ObjectId
  @Prop({ required: true })
  deckId: string;

  @Prop({
    required: true,
    enum: PossibleCardCreators,
    default: 'User',
  })
  createdBy: string;

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

  @Prop({ required: true })
  sourceLanguage: string;

  @Prop({ required: true })
  targetLanguage: string;

  @Prop({
    type: [
      {
        expression: { type: String, required: false, trim: true },
        usageExample: { type: String, required: false, trim: true },
        translatedExpression: { type: String, required: false, trim: true },
        translatedUsageExample: { type: String, required: false, trim: true },
        _id: false,
      },
    ],
    validate: {
      validator: function (textArray: any[]) {
        return textArray.some((textItem) => textItem.expression || textItem.translatedExpression);
      },
      message: 'At least one of expression or translatedExpression must be provided',
    },
    required: true,
  })
  text: {
    expression: string;
    usageExample?: string;
    translatedExpression?: string;
    translatedUsageExample?: string;
  };

  // TODO: change ids? To path/link after connecting with data storage?
  @Prop({
    type: [
      {
        expression: { type: String, required: false, trim: true },
        usageExample: { type: String, required: false, trim: true },
        translatedExpression: { type: String, required: false, trim: true },
        translatedUsageExample: { type: String, required: false, trim: true },
        _id: false,
      },
    ],
    required: false,
  })
  audioIds: {
    expression?: string;
    usageExample?: string;
    translatedExpression?: string;
    translatedUsageExample?: string;
  };
}

const UserCardSchema = SchemaFactory.createForClass(UserCard);

export default UserCardSchema;
