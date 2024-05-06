import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OfficialDeckDocument } from './official-deck.model';
import { CreateOfficialDeckDTO, UpdateOfficialDeckDTO } from './dto';

@Injectable()
export class OfficialDeckService {
  constructor(
    @InjectModel('OfficialDeck') private readonly officialDeckModel: Model<OfficialDeckDocument>
  ) {}

  async findDeck(deckId: string): Promise<OfficialDeckDocument> {
    const deck = await this.officialDeckModel.findById(deckId);

    if (!deck) {
      throw new NotFoundException('Deck not found');
    }

    return deck;
  }

  async createDeck(createDeckInput: CreateOfficialDeckDTO): Promise<OfficialDeckDocument> {
    const deck = await this.officialDeckModel.create(createDeckInput);
    return deck;
  }

  // update props without array of cards
  async updateDeck(deckId: string, updateDeckInput: UpdateOfficialDeckDTO) {
    const deck = await this.officialDeckModel.findOneAndUpdate({ _id: deckId }, updateDeckInput, {
      new: true,
    });

    if (!deck) {
      throw new NotFoundException(`Cannot update, deck not found`);
    }

    return deck;
  }

  // TODO what it should return?
  //   async addCardToDeck(deckId: string, cardId: string) {
  //     const deck = await this.officialDeckModel.findOneAndUpdate(
  //       { _id: deckId },
  //       { $push: { cards: cardId } },
  //       { new: true, session }
  //     );
  //   }
}
