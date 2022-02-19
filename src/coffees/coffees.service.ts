import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ) {}

    findAll() {
        return this.coffeeRepository.find({
            relations: ['flavors'],
        });
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flavors'],
        });

        if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map((name) =>
                this.firstOrCreateFlavorByName(name)
            )
        );

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors,
        });

        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors =
            updateCoffeeDto.flavors &&
            (await Promise.all(
                updateCoffeeDto.flavors.map((name) =>
                    this.firstOrCreateFlavorByName(name)
                )
            ));

        const coffee = await this.coffeeRepository.preload({
            id: id,
            ...updateCoffeeDto,
            flavors,
        });

        if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    private async firstOrCreateFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = this.flavorRepository.findOne({ name: name });
        if (existingFlavor) {
            return existingFlavor;
        }

        return this.flavorRepository.create({ name });
    }
}
