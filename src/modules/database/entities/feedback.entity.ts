import { Entity, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Users } from './users.entity'; // Optional, if you allow user reviews
import Base from './base.entity';

@Entity('feedback')
export class Feedback extends Base {
  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
  user?: Users;

  @Column({ type: 'int', width: 1 })
  rating: number; // From 1 to 5

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Column({ default: false })
  isPublic: boolean;
}
