import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DeckDocument } from './deck.model';
import { CreateDeckDTO, UpdateDeckInputDTO } from './dto';

@Injectable()
export class DeckService {
  constructor(@InjectModel('Deck') private readonly deckModel: Model<DeckDocument>) {}
  async createDeck(deckOwner: string, createDeckInput: CreateDeckDTO): Promise<DeckDocument> {
    const deck = await this.deckModel.create({ deckOwner, ...createDeckInput });
    return deck;
  }

  async getDeck(id: string): Promise<DeckDocument> {
    const deck = await this.deckModel.findById(id);
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }

  async updateDeck(deckOwner: string, deckId: string, updateDeckInput: UpdateDeckInputDTO) {
    const deck = await this.deckModel.findOneAndUpdate(
      { _id: deckId, deckOwner },
      updateDeckInput,
      { new: true }
    );

    if (!deck) {
      throw new NotFoundException(`Cannot update, deck not found`);
    }

    return deck;
  }
}
