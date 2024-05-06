import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { OfficialCardService } from './official-card.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import { GoogleTranslateService } from '../google-translate/google-translate.service';
import { OpenAiService } from '../openai/openai.service';

describe('OfficialCardService', () => {
  let service: OfficialCardService;

  const mockOfficialCardModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };

  const mockOfficialDeckModel = {
    findOneAndUpdate: jest.fn(),
  };
  const mockGoogleTranslateService = {} as unknown as GoogleTranslateService;
  const mockOpenAiService = {} as unknown as OpenAiService;
  const mockDatabaseConnection = {
    startSession: jest.fn().mockReturnValue({
      startTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      endSession: jest.fn(),
    }),
  } as unknown as mongoose.Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfficialCardService,
        OpenAiService,
        GoogleTranslateService,
        {
          provide: getModelToken('OfficialCard'),
          useValue: mockOfficialCardModel,
        },
        {
          provide: getModelToken('OfficialDeck'),
          useValue: mockOfficialDeckModel,
        },
        {
          provide: 'DatabaseConnection',
          useValue: mockDatabaseConnection,
        },
        {
          provide: GoogleTranslateService,
          useValue: mockGoogleTranslateService,
        },
        {
          provide: OpenAiService,
          useValue: mockOpenAiService,
        },
      ],
    }).compile();

    service = module.get<OfficialCardService>(OfficialCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOfficialCards', () => {
    const officialCardIds = ['1', '2']; // Add some official card IDs here
    const languages = ['en', 'de'];

    it('should return official cards when they exist in the database', async () => {
      // Add languages as needed
      const mockOfficialCards = [
        {
          _id: '1',
          cardStatus: 'Unfinished',
          deckId: 'someId123',
          translations: [
            { language: 'en', expression: 'someEnglischWord' },
            { language: 'de', expression: 'someGermanWord' },
          ],
        },
        {
          _id: '2',
          cardStatus: 'Unfinished',
          deckId: 'someId123',
          translations: [
            { language: 'en', expression: 'someOtherEnglischWord' },
            { language: 'de', expression: 'someOtherGermanWord' },
          ],
        },
      ];

      mockOfficialCardModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(mockOfficialCards),
        }),
      });
      const result = await service.getOfficialCards(officialCardIds, languages);

      expect(result).toEqual(mockOfficialCards);
    });

    it('should throw NotFoundException when no official cards are found', async () => {
      mockOfficialCardModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([]),
        }),
      });

      await expect(service.getOfficialCards(officialCardIds, languages)).rejects.toThrow(
        new NotFoundException('No official cards found.')
      );
    });
  });

  describe('createOfficialCard', () => {
    const createOfficialCardInput = {
      deckId: 'deckId',
      translations: {
        language: 'en',
        expression: 'test',
      },
    };

    const expectedOfficialCard = {
      _id: 'cardId',
      deckId: 'deckId',
      cardStatus: 'Unfinished',
      translations: {
        language: 'en',
        expression: 'test',
      },
    };

    const expectedOfficialDeck = {
      _id: 'deckId',
      name: 'Testing deck',
      cards: ['cardId'],
    };
    it('should create an official card', async () => {
      mockOfficialCardModel.create.mockResolvedValueOnce([expectedOfficialCard]);
      mockOfficialDeckModel.findOneAndUpdate.mockResolvedValueOnce(expectedOfficialDeck);

      const result = await service.createOfficialCard(createOfficialCardInput);

      //TODO: should session be mocked?
      expect(result).toEqual(expectedOfficialCard);
      expect(mockOfficialCardModel.create).toHaveBeenCalledWith(
        [createOfficialCardInput],
        expect.any(Object)
      );

      expect(mockOfficialDeckModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(mockOfficialDeckModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: createOfficialCardInput.deckId },
        expect.any(Object),
        expect.any(Object)
      );
    });

    it('should throw NotFoundException when deck is not found', async () => {
      mockOfficialCardModel.create.mockResolvedValueOnce([expectedOfficialCard]);
      mockOfficialDeckModel.findOneAndUpdate.mockResolvedValueOnce(null);

      await expect(service.createOfficialCard(createOfficialCardInput)).rejects.toThrow(
        new NotFoundException('Cannot find your deck, try again or contact support')
      );
    });

    it('should throw BadRequestException when error occurs in database schema validation', async () => {
      mockOfficialCardModel.create.mockRejectedValueOnce({
        name: 'ValidationError',
        message: 'Validation error message',
      });

      await expect(service.createOfficialCard(createOfficialCardInput)).rejects.toThrow(
        new BadRequestException('Validation error occurred.', 'Validation error message')
      );
    });

    it('should throw Error when unknown error occurs', async () => {
      mockOfficialCardModel.create.mockRejectedValueOnce(new Error('Unknown error message'));

      await expect(service.createOfficialCard(createOfficialCardInput)).rejects.toThrow(
        new Error('Error in creating official card: Unknown error message')
      );
    });
  });

  describe('addTranslation', () => {});
  describe('updateTranslation', () => {});
  describe('generateUsageExample', () => {});
  describe('generateExpressionTranslation', () => {});
  describe('generateUsageExampleTranslationWithGoogleTranslate', () => {});
  describe('generateUsageExampleTranslationWithOpenAI', () => {});
});
