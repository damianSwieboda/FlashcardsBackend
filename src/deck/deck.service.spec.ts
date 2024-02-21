import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { DeckService } from './deck.service';

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
    const updateDeckInput = {
      name: 'updated name',
      description: 'updated description',
      cardId: '12345',
    };
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

    it('should throw an error if deck is not found', async () => {
      const mockError = new Error('Deck not found');

      mockDeckModel.findOneAndUpdate.mockResolvedValueOnce(null);

      await expect(service.updateDeck(deckOwner, null, updateDeckInput)).rejects.toThrow(mockError);
    });

    // todo: consider upgrading error handling for recognizig, for example, why update fails
    // todo: test to fix
    it('should throw an error if update fails', async () => {
      const mockError = new Error('Update failed');

      mockDeckModel.findOneAndUpdate.mockRejectedValueOnce(mockError);

      await expect(service.updateDeck(deckOwner, deckId, updateDeckInput)).rejects.toThrow(Error);
    });
  });
});
