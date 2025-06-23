import { Entity, Column, OneToMany } from 'typeorm';
import { Vehicle } from './vehicles.entity'; // Optional: if you manage individual vehicles
import Base from './base.entity';

@Entity('vehicle_categories')
export class VehicleCategory extends Base {
  @Column({ unique: true })
  name: string; // e.g., "Economy", "Business", "SUV"

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'int' })
  maxPassengers: number;

  @Column({ type: 'int' })
  maxLuggage: number;

  @Column({ type: 'float' })
  baseFare: number; // base fare in default currency

  @Column({ type: 'float' })
  perKmRate: number; // for distance-based pricing

  @Column({ nullable: true })
  imageUrl?: string; // to show vehicle type in UI

  @Column({ default: true })
  isActive: boolean;

  // Optional: Link to actual vehicles
  @OneToMany(() => Vehicle, (vehicle) => vehicle.category)
  vehicles: Vehicle[];
}
