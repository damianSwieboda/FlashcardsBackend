import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CreateOfficialCardDTO } from './dto/create-official-card.dto';
import { OfficialCardDocument } from './official-card.model';
import { OfficialDeckDocument } from 'src/official-deck/official-deck.model';
import { AddTranslationDTO, UpdateTranslationDTO } from './dto';
import { GoogleTranslateService } from '../google-translate/google-translate.service';
// import { GoogleTranslateService } from 'src/google-translate/google-translate.service';
import { OpenAiService } from '../openai/openai.service';
import { LanguagesSupportedByGoogleTranslate } from '../enums/suported-languages';
import getEnumKey from '../utils/getEnumKey';

@Injectable()
export class OfficialCardService {
  constructor(
    @InjectModel('OfficialCard') private readonly officialCardModel: Model<OfficialCardDocument>,
    @InjectModel('OfficialDeck') private readonly officialDeckModel: Model<OfficialDeckDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    @Inject(GoogleTranslateService) private readonly googleTranslateService: GoogleTranslateService,
    @Inject(OpenAiService) private readonly openAiService: OpenAiService
  ) {}

  async getOfficialCards(officialCardIds: string[], languages: string[]) {
    const officialCards = await this.officialCardModel
      .find({
        _id: { $in: officialCardIds },
      })
      .select({
        _id: 1,
        cardStatus: 1,
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
    if (officialCards.length === 0) {
      throw new NotFoundException('No official cards found.');
    }

    return officialCards;
  }

  async createOfficialCard(createOfficialCardInput: CreateOfficialCardDTO) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const officialCards = await this.officialCardModel.create([createOfficialCardInput], {
        session,
      });

      const officialCard = officialCards[0];

      const deck = await this.officialDeckModel.findOneAndUpdate(
        { _id: createOfficialCardInput.deckId },
        { $push: { cards: officialCard._id } },
        { new: true, session }
      );

      if (!deck) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('Cannot find your deck, try again or contact support');
      }

      await session.commitTransaction();
      session.endSession();

      return officialCard;
    } catch (error) {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }

      if (error instanceof NotFoundException) {
        throw error;
        // error from database schema validation
      } else if (error.name === 'ValidationError') {
        throw new BadRequestException('Validation error occurred.', error.message);
      } else {
        throw new Error(`Error in creating official card: ${error.message}`);
      }
    }
  }

  async addTranslation(officialCardId: string, addTranslationDTO: AddTranslationDTO) {
    const translation = await this.officialCardModel
      .findOneAndUpdate(
        {
          _id: officialCardId,
          'translations.language': { $ne: addTranslationDTO.language }, // Check if language doesn't already exist
        },
        {
          $addToSet: {
            // Use $addToSet instead of $push to avoid duplicates
            translations: addTranslationDTO,
          },
        },
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
      throw new NotFoundException(
        'Unable to add translation, it already exist or cannot find official card.'
      );
    }

    return 'Official card updated successfully!';
  }

  async updateTranslation(officialCardId: string, updatetranslationDTO: UpdateTranslationDTO) {
    const updatedTranslation = await this.officialCardModel.updateOne(
      { _id: officialCardId, 'translations.language': updatetranslationDTO.language },
      {
        $set: {
          'translations.$.expression': updatetranslationDTO?.expression,
          'translations.$.usageExample': updatetranslationDTO?.usageExample,
        },
      }
    );

    if (!updatedTranslation) {
      throw new NotFoundException('Translation not found or not updated.');
    }

    return 'Official card text successfully updated!';
  }

  async generateUsageExample(officialCardId: string) {
    const [sourceCard] = await this.getOfficialCards([officialCardId], ['en']);
    const sourceExpression = sourceCard.translations[0].expression;
    if (!sourceExpression) throw new NotFoundException('Cannot find expression in fetched card');

    const generatedUsageExample = await this.openAiService.generateUsageExample(sourceExpression);

    const updateTranslationDTO: UpdateTranslationDTO = {
      language: 'en',
      usageExample: generatedUsageExample,
    };

    await this.updateTranslation(officialCardId, updateTranslationDTO);

    return generatedUsageExample;
  }

  async generateExpressionTranslation(
    officialCardId: string,
    targetLanguage: LanguagesSupportedByGoogleTranslate
  ) {
    const [sourceCard] = await this.getOfficialCards([officialCardId], ['en']);
    const sourceExpression = sourceCard.translations[0].expression;
    if (!sourceExpression) throw new NotFoundException('Cannot find expression in fetched card');

    const translatedExpression = await this.googleTranslateService.translateExpression(
      sourceExpression,
      'en',
      targetLanguage
    );

    await this.addTranslation(officialCardId, {
      language: targetLanguage,
      expression: translatedExpression,
    });

    return translatedExpression;
  }

  async generateUsageExampleTranslationWithGoogleTranslate(
    officialCardId: string,
    targetLanguage: LanguagesSupportedByGoogleTranslate
  ) {
    const [sourceCard] = await this.getOfficialCards([officialCardId], ['en', targetLanguage]);
    const { usageExample } = sourceCard.translations.find((item) => item.language === 'en');

    if (!usageExample) {
      throw new NotFoundException(
        'Cannot find english usage example in fetched card - it is required to generate translated usage example'
      );
    }

    const generatedUsageExampleTranslation = await this.googleTranslateService.translateExpression(
      usageExample,
      'en',
      targetLanguage
    );

    const updateTranslationDTO: UpdateTranslationDTO = {
      language: targetLanguage,
      usageExample: generatedUsageExampleTranslation,
    };

    await this.updateTranslation(officialCardId, updateTranslationDTO);

    return generatedUsageExampleTranslation;
  }

  async generateUsageExampleTranslationWithOpenAI(
    officialCardId: string,
    targetLanguage: LanguagesSupportedByGoogleTranslate
  ) {
    const [sourceCard] = await this.getOfficialCards([officialCardId], ['en', targetLanguage]);
    const { expression, usageExample } = sourceCard.translations.find(
      (item) => item.language === 'en'
    );
    const targetLanguageExpression = sourceCard.translations.find(
      (item) => item.language === targetLanguage
    ).expression;

    if (!expression || !usageExample || !targetLanguageExpression) {
      throw new NotFoundException(
        'Cannot find expression, or usage example, or translated expression in fetched card - they are required to generate translated usage example'
      );
    }

    const targetLanguageFullName = getEnumKey(
      targetLanguage,
      LanguagesSupportedByGoogleTranslate
    ).toLocaleLowerCase();

    const generatedUsageExampleTranslation =
      await this.openAiService.generateUsageExampleTranslation(
        expression,
        usageExample,
        targetLanguageExpression,
        targetLanguageFullName
      );

    const updateTranslationDTO: UpdateTranslationDTO = {
      language: targetLanguage,
      usageExample: generatedUsageExampleTranslation,
    };

    await this.updateTranslation(officialCardId, updateTranslationDTO);

    return generatedUsageExampleTranslation;
  }
}
