import { Entity, Column } from 'typeorm';
import Base from './base.entity';

@Entity('quotes')
export class Quote extends Base {
  @Column()
  pickupLocation: string;

  @Column()
  dropoffLocation: string;

  @Column({ type: 'timestamp' })
  pickupDateTime: Date;

  @Column({ type: 'int' })
  passengers: number;

  @Column()
  vehicleType: string;

  @Column({ type: 'float' })
  estimatedFare: number;

  @Column({ default: false })
  isRoundTrip: boolean;

  @Column({ type: 'timestamp', nullable: true })
  returnDateTime?: Date;

  @Column({ nullable: true })
  flightNumber?: string;

  @Column({ nullable: true })
  specialInstructions?: string;
}
