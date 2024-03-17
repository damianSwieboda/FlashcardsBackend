import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { DeckService } from './deck.service';

import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('DeckService', () => {
  let service: DeckService;

  const deckOwner = '123';
  const createDeckInput = {
    name: 'Testing deck',
    firstLanguage: 'polish',
    secondLanguage: 'english',
  };

  const mockDeckModel = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeckService,
        {
          provide: getModelToken('Deck'),
          useValue: mockDeckModel,
        },
      ],
    }).compile();

    service = module.get<DeckService>(DeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDeck', () => {
    it('should return successfully created deck', async () => {
      const mockCreatedDeck = {
        _id: {
          $oid: '123456789',
        },
        deckOwner: '123',
        name: 'Testing deck',
        firstLanguage: 'polish',
        secondLanguage: 'english',
        cards: [],
        __v: 0,
      };

      mockDeckModel.create.mockResolvedValueOnce(mockCreatedDeck);
      const result = await service.createDeck(deckOwner, createDeckInput);

      expect(result).toEqual(mockCreatedDeck);
      expect(mockDeckModel.create).toHaveBeenCalledWith({ deckOwner, ...createDeckInput });
    });

    it('should throw an error if create fails', async () => {
      const mockError = new Error('Failed to create deck');

      mockDeckModel.create.mockRejectedValueOnce(mockError);

      await expect(service.createDeck(deckOwner, createDeckInput)).rejects.toThrow(mockError);
      expect(mockDeckModel.create).toHaveBeenCalledWith({ deckOwner, ...createDeckInput });
    });
  });

  describe('updateDeck', () => {
    const deckId = '1234';

    const defaultUpdateDeckInput = {
      name: 'updated name',
      description: 'updated description',
      cardId: '12345',
    };

    const updateDeckInputGenerator = (overrides?: Partial<typeof defaultUpdateDeckInput>) => {
      return {
        ...defaultUpdateDeckInput,
        ...overrides,
      };
    };

    const updateDeckInput = updateDeckInputGenerator();

    const mockUpdatedDeck = {
      _id: {
        $oid: '1234',
      },
      deckOwner: '123',
      name: 'updated name',
      description: 'updated description',
      cards: ['12345'],
    };

    it('should return successfully updated deck', async () => {
      mockDeckModel.findOneAndUpdate.mockResolvedValueOnce(mockUpdatedDeck);

      const result = await service.updateDeck(deckOwner, deckId, updateDeckInput);

      expect(result).toEqual(mockUpdatedDeck);
      expect(mockDeckModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: deckId, deckOwner },
        updateDeckInput,
        { new: true }
      );
    });

    // we don't check the content but the error instance type in the tests below
    it('should throw NotFoundException when deck is not found', async () => {
      const nonExistentDeckId = 'nonExistentDeckId';

      await expect(
        service.updateDeck(deckOwner, nonExistentDeckId, updateDeckInput)
      ).rejects.toThrow(new NotFoundException(`Cannot update, deck not found`));
    });

    it('should throw BadRequestException when invalid input is provided', async () => {
      const invalidUpdateInput = updateDeckInputGenerator({ name: '' });

      mockDeckModel.findOneAndUpdate.mockImplementationOnce(() => {
        throw {
          name: 'ValidationError',
        };
      });

      await expect(service.updateDeck(deckOwner, deckId, invalidUpdateInput)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      mockDeckModel.findOneAndUpdate.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(service.updateDeck(deckOwner, deckId, updateDeckInput)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
