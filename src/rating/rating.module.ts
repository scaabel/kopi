import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
    imports: [CoffeesModule],
    providers: [RatingService],
})
export class RatingModule {}
