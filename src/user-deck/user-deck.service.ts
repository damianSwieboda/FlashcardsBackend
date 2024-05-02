import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDeckDocument } from './user-deck.model';
import { CreateUserDeckDTO, UpdateUserDeckDTO } from './dto';

@Injectable()
export class UserDeckService {
  constructor(@InjectModel('UserDeck') private readonly userDeckModel: Model<UserDeckDocument>) {}
  async createDeck(
    deckOwner: string,
    createDeckInput: CreateUserDeckDTO
  ): Promise<UserDeckDocument> {
    const deck = await this.userDeckModel.create({ deckOwner, ...createDeckInput });
    return deck;
  }

  async getDeck(id: string): Promise<UserDeckDocument> {
    const deck = await this.userDeckModel.findById(id);
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }

  async updateDeck(deckOwner: string, deckId: string, updateDeckInput: UpdateUserDeckDTO) {
    const deck = await this.userDeckModel.findOneAndUpdate(
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
