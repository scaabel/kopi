import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
        DatabaseModule.register({
            type: 'postgres',
            host: 'localhost',
            password: 'secret',
            port: 5432,
            database: 'testing_env',
        }),
        CoffeesModule,
    ],
    providers: [RatingService],
})
export class RatingModule {}
