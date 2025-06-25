import { Entity, Column, ManyToOne, Unique, OneToMany } from 'typeorm';
import { Roles } from './roles.entity';
import Base from './base.entity';
import { Quote } from './quotes.entity';

@Unique('users', ['email', 'userName'])
@Entity()
export class Users extends Base {
  @Column()
  fullName: string;
  @Column({ nullable: true })
  age?: number;
  @Column()
  email: string;
  @Column()
  userName: string;
  @Column({ nullable: true })
  phone: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  dob: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  city: string;
  @Column({ nullable: true })
  country: string;
  @Column({ nullable: true })
  profilePic: string;
  @Column({ nullable: true })
  state?: string;
  @ManyToOne(() => Roles, (roles) => roles.users)
  roles: Roles;
  @Column({ nullable: true })
  encryptedPassword?: string;
  @Column({ nullable: true })
  postalCode?: string;
  @Column({ default: false })
  isActive: boolean;
  @Column({ default: false })
  isDeleted: boolean;
  @Column({ default: false })
  isEmailVerified: boolean;
  @Column({ default: false })
  isPhoneVerified: boolean;
  @Column({ default: false })
  isTwoFactorEnabled: boolean;
  @Column({ default: false })
  isPasswordReset: boolean;
  @OneToMany(() => Quote, (quotes) => quotes.user, {
    eager: true,
    nullable: true,
  })
  quotes: Quote[];
}
