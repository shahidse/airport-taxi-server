import { Entity, Column, ManyToOne } from 'typeorm';
import { VehicleCategory } from './vehicleCategory.entity';
import { Users } from './users.entity'; // Assuming drivers are stored in User entity
import Base from './base.entity';

@Entity('vehicles')
export class Vehicle extends Base {
  @Column()
  registrationNumber: string;

  @Column()
  model: string; // e.g., "Toyota Prius"

  @Column()
  color: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ default: 'available' })
  status: 'available' | 'busy' | 'inactive' | 'maintenance';

  @ManyToOne(() => VehicleCategory, (category) => category.vehicles, {
    eager: true,
  })
  category: VehicleCategory;

  @ManyToOne(() => Users, { nullable: true })
  driver?: Users;

  @Column({ default: false })
  isVerified: boolean;
}
