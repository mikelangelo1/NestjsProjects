import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthenticationModule,
    CategoriesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
