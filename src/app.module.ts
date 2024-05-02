import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { OfficialDeckModule } from './official-deck/official-deck.module';
import { OfficialCardModule } from './official-card/official-card.module';
import { UserCardModule } from './user-card/user-card.module';
// import { HttpExceptionFilter } from './http.exception-filter';
// import { APP_FILTER } from '@nestjs/core';
import { OpenAiModule } from './openai/openai.module';
import { GoogleTranslateModule } from './google-translate/google-translate.module';
// TODO: how can we provide more user-friendly messages? Providing nuber instead of string will throw the same error like trying to pass non existing props in dto, how to differ errors so, we can provide user-frienly infrmations and avoid leaking sensitive data, like props keys
// console.log(err);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      formatError: (err) => {
        console.log(err);
        return {
          message: 'Somethin went wrong',
          status: err.message || err.extensions.code || err.extensions.originalError,
        };
      },
    }),
    OfficialDeckModule,
    OfficialCardModule,
    UserCardModule,
    OpenAiModule,
    GoogleTranslateModule,
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //   },
  // ],
})
export class AppModule {}
