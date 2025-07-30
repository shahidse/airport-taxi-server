import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import Base from './base.entity';
import { Users } from './users.entity';
import { Order } from './order.entity';

@Entity('quotes')
export class Quotes extends Base {
  @Column()
  pickupLocation: string;

  @Column()
  dropoffLocation: string;

  @Column({ type: 'timestamp' })
  pickupDateTime: Date;

  @Column({ type: 'int' })
  passengers: number;

  @Column()
  luggage: number;

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
  @ManyToOne(() => Users, (user) => user.quotes, { nullable: true })
  user: Users;
  @OneToOne(() => Order, (order) => order.quote, { nullable: true })
  order?: Order;
}
