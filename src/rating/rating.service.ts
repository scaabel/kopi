import { Injectable } from '@nestjs/common';
import { CoffeesService } from '../coffees/coffees.service';

@Injectable()
export class RatingService {
    constructor(private readonly coffeesService: CoffeesService) {}
}
