import { Injectable } from '@nestjs/common';
import { CreateCardDTO } from './dto/create-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CardDocument } from './card.model';
import { DeckDocument } from 'src/deck/deck.model';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { AddTranslationDTO, UpdateTranslationDTO } from './dto';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private readonly cardModel: Model<CardDocument>,
    @InjectModel('Deck') private readonly deckModel: Model<DeckDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {}

  async getCards(cardIds: string[], languages: string[]) {
    const cards = await this.cardModel
      .find({
        _id: { $in: cardIds },
      })
      .select({
        _id: 1,
        isOfficial: 1,
        deckId: 1,
        translations: {
          $filter: {
            input: '$translations',
            as: 'translation',
            cond: { $in: ['$$translation.language', languages] },
          },
        },
      })
      .exec();

    // TODO is that really an error? it is not if there is no cards in deck, but if user wants to get cards for another purpouse, that cards should be found
    if (!cards) {
      throw new NotFoundException('No cards found.');
    }

    return cards;
  }

  async createCard(createCardInput: CreateCardDTO) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const card = new this.cardModel(createCardInput);

      const deck = await this.deckModel.findOneAndUpdate(
        { _id: createCardInput.deckId },
        { $push: { cards: card._id } },
        { new: true, session }
      );
      if (!deck) {
        throw new NotFoundException('Cannot find your deck, try again or contact support');
      }

      await card.save({ session });
      await session.commitTransaction();
      session.endSession();

      return card;
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

  async addTranslation(cardId: string, addTranslationDTO: AddTranslationDTO) {
    const translation = await this.cardModel
      .findOneAndUpdate(
        { _id: cardId },
        { $push: { translations: addTranslationDTO } },
        { new: true }
      )
      .select({
        translations: {
          $elemMatch: {
            language: addTranslationDTO.language,
          },
        },
      });

    if (!translation) {
      throw new NotFoundException('Card not found or unable to add translation.');
    }

    return 'Card updated successfully!';
  }

  async updateTranslation(cardId: string, updatetranslationDTO: UpdateTranslationDTO) {
    const updatedTranslation = await this.cardModel.updateOne(
      { _id: cardId, 'translations.language': updatetranslationDTO.language },
      {
        $set: {
          'translations.$.word': updatetranslationDTO.word,
          'translations.$.usageExample': updatetranslationDTO.usageExample,
        },
      }
    );

    if (!updatedTranslation) {
      throw new NotFoundException('Translation not found or not updated.');
    }

    return 'Card text successfully updated!';
  }
}
