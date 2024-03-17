import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './user/user.module';
import UserSchema from './user/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DeckModule } from './deck/deck.module';
import { CardModule } from './card/card.module';
// import { HttpExceptionFilter } from './http.exception-filter';
import { AiModule } from './ai/ai.module';
import { GoogleTranslateModule } from './google-translate/google-translate.module';

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
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      formatError: (err) => {
        // TODO: how can we provide more user-friendly messages? Providing number instead of string will throw the same error like trying to pass non existing props in dto, how to differ errors so, we can provide user-frienly infrmations and avoid leaking sensitive data, like props keys
        // console.log(err);
        return {
          message: 'Somethin went wrong',
          status: err.extensions.originalError || err.extensions.code,
        };
      },
    }),
    UserModule,
    AuthModule,
    DeckModule,
    CardModule,
    AiModule,
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
