import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Quote } from './quotes.entity';
import { Users } from './users.entity'; // Optional, if you support logged-in users
import Base from './base.entity';

@Entity('orders')
export class Order extends Base {
  @Column()
  bookingReference: string;

  @ManyToOne(() => Users, { nullable: true }) // Optional if you allow guest bookings
  user?: Users;

  @OneToOne(() => Quote, { cascade: true })
  @JoinColumn()
  quote: Quote;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @Column({ type: 'enum', enum: ['cash', 'card', 'stripe'], default: 'cash' })
  paymentMethod: 'cash' | 'card' | 'stripe';

  @Column({ default: false })
  isPaid: boolean;

  @Column({ nullable: true })
  transactionId?: string;

  @Column({ nullable: true })
  contactName?: string;

  @Column({ nullable: true })
  contactPhone?: string;

  @Column({ nullable: true })
  contactEmail?: string;
}
