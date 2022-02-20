import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingModule } from './rating/rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.required(),
                DATABASE_PORT: Joi.number().default(5432),
                DATABASE_USER: Joi.required(),
                DATABASE_PASSWORD: Joi.required(),
                DATABASE_NAME: Joi.required(),
                DATABASE_AUTO_LOAD_ENTITIES: Joi.bool().default(true),
                DATABASE_SYNCHRONIZE: Joi.bool().default(false),
            }),
        }),
        CoffeesModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: Boolean(process.env.DATABASE_AUTO_LOAD_ENTITIES),
            synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
        }),
        RatingModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
