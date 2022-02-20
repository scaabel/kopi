import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
        DatabaseModule.register({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        }),
        CoffeesModule,
    ],
    providers: [RatingService],
})
export class RatingModule {}
