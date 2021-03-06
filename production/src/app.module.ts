import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { EventModule } from './event/event.module';

const host = process.env.DATABASE_HOST || 'localhost';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    }),
    MongooseModule.forRoot(`mongodb://${host}/nest`),
    UserModule,
    EventModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
