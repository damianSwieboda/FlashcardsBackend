import { Injectable } from '@nestjs/common';
import { CreateUserCardDTO } from './dto/create-user-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserCardDocument } from './user-card.model';
import { DeckDocument } from 'src/deck/deck.model';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class UserCardService {
  constructor(
    @InjectModel('UserCard') private readonly userCardModel: Model<UserCardDocument>,
    @InjectModel('Deck') private readonly deckModel: Model<DeckDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {}

  async getUserCards(userCardIds: string[]) {
    const userCards = await this.userCardModel
      .find({
        _id: { $in: userCardIds },
      })
      .exec();

    // TODO is that really an error? it is not if there is no cards in deck, but if user wants to get cards for another purpouse, that cards should be found
    if (!userCards) {
      throw new NotFoundException('No cards found.');
    }

    return userCards;
  }

  async createUserCard(createUserCardInput: CreateUserCardDTO) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const userCard = new this.userCardModel(createUserCardInput);

      const deck = await this.deckModel.findOneAndUpdate(
        { _id: createUserCardInput.deckId },
        { $push: { cards: userCard._id } },
        { new: true, session }
      );
      if (!deck) {
        throw new NotFoundException('Cannot find your deck, try again or contact support');
      }

      await userCard.save({ session });
      await session.commitTransaction();
      session.endSession();

      return userCard;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof NotFoundException) {
        throw error;
      } else if (error.name === 'ValidationError') {
        throw new BadRequestException('Validation error occurred.', error.message);
      } else {
        throw new Error(`Error in creating card: ${error.message}`);
      }
    }
  }
}
