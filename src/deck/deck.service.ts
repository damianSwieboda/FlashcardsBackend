import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DeckDocument } from './deck.model';
import { CreateDeckInputDTO, UpdateDeckInputDTO } from './dto';

@Injectable()
export class DeckService {
  constructor(@InjectModel('Deck') private readonly deckModel: Model<DeckDocument>) {}
  async createDeck(deckOwner: string, createDeckInput: CreateDeckInputDTO): Promise<DeckDocument> {
    try {
      const deck = new this.deckModel({ deckOwner, ...createDeckInput });
      await deck.save();
      return deck;
    } catch (error) {
      throw new Error('Failed to create deck');
    }
  }

  async updateDeck(
    deckOwner: string,
    deckId: string,
    updateDeckInput: UpdateDeckInputDTO
  ): Promise<DeckDocument> {
    try {
      const deck = await this.deckModel.findOneAndUpdate(
        { _id: deckId, deckOwner },
        updateDeckInput,
        { new: true }
      );

      if (!deck) {
        throw new Error('Deck not found');
      }

      return deck;
    } catch (error) {
      throw new Error('Failed to update deck');
    }
  }
}
