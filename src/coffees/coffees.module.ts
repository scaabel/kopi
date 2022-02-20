import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../event/entities/event.entity';
import { BRANDS } from './coffees.constants';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        {
            provide: BRANDS.COFFEE_BRANDS,
            useFactory: () => ['nescafe', 'wonda'],
        },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
