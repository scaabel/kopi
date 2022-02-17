import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Kopi Jantan',
            brand: 'Ali Cafe',
            flavors: ['chocolate', 'kaw'],
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find((item) => item.id === +id);
        if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

        return coffee;
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);

        return createCoffeeDto;
    }

    update(id: string) {
        const existingCoffee = this.findOne(id);

        if (existingCoffee) {
            // update
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);

        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    }
}
