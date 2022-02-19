import {
    JoinTable,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 0 })
    recommendation: number;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
        cascade: true,
    })
    flavors: Flavor[];
}
