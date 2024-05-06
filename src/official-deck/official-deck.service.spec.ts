import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

import { OfficialDeckService } from './official-deck.service';

describe('OfficialDeckService', () => {
  let service: OfficialDeckService;

  const createDeckInput = {
    name: 'Testing deck',
    firstLanguage: 'polish',
    secondLanguage: 'english',
  };

  const mockOfficialDeckModel = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfficialDeckService,
        {
          provide: getModelToken('OfficialDeck'),
          useValue: mockOfficialDeckModel,
        },
      ],
    }).compile();

    service = module.get<OfficialDeckService>(OfficialDeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findDeck', () => {
    it('should return found deck', async () => {
      const deckId = '123';

      const mockFoundDeck = {
        _id: '123',
        name: 'Testing deck',
        cards: [],
        __v: 0,
      };

      mockOfficialDeckModel.findById.mockResolvedValueOnce(mockFoundDeck);
      const result = await service.findDeck(deckId);

      expect(result).toEqual(mockFoundDeck);
      expect(mockOfficialDeckModel.findById).toHaveBeenCalledWith(deckId);
    });

    it('should throw NotFoundException when deck is not found', async () => {
      const deckId = 'nonExisteningDeckId';

      await expect(service.findDeck(deckId)).rejects.toThrow(
        new NotFoundException('Deck not found')
      );

      expect(mockOfficialDeckModel.findById).toHaveBeenCalledWith(deckId);
    });
  });

  describe('createDeck', () => {
    it('should return successfully created deck', async () => {
      const mockCreatedDeck = {
        _id: {
          $oid: '123456789',
        },
        name: 'Testing deck',
        cards: [],
        __v: 0,
      };

      mockOfficialDeckModel.create.mockResolvedValueOnce(mockCreatedDeck);
      const result = await service.createDeck(createDeckInput);

      expect(result).toEqual(mockCreatedDeck);
      expect(mockOfficialDeckModel.create).toHaveBeenCalledWith(createDeckInput);
    });

    it('should throw an error if create fails', async () => {
      const mockError = new Error('Failed to create deck');

      mockOfficialDeckModel.create.mockRejectedValueOnce(mockError);

      await expect(service.createDeck(createDeckInput)).rejects.toThrow(mockError);
      expect(mockOfficialDeckModel.create).toHaveBeenCalledWith(createDeckInput);
    });
  });

  describe('updateDeck', () => {
    const deckId = '1234';

    const defaultUpdateDeckInput = {
      name: 'some name',
      description: 'some description',
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
      name: 'some name',
      description: 'some description',
      cards: ['12345'],
    };

    it('should return successfully updated deck', async () => {
      mockOfficialDeckModel.findOneAndUpdate.mockResolvedValueOnce(mockUpdatedDeck);

      const result = await service.updateDeck(deckId, updateDeckInput);

      expect(result).toEqual(mockUpdatedDeck);
      expect(mockOfficialDeckModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: deckId },
        updateDeckInput,
        { new: true }
      );
    });

    // we don't check the content but the error instance type in the tests below
    it('should throw NotFoundException when deck is not found', async () => {
      const nonExisteningDeckId = 'nonExisteningDeckId';

      await expect(service.updateDeck(nonExisteningDeckId, updateDeckInput)).rejects.toThrow(
        new NotFoundException(`Cannot update, deck not found`)
      );
    });
  });
});
