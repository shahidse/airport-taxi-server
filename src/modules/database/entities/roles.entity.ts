import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { Users } from './users.entity';
import Base from './base.entity';
@Unique('roles', ['secret'])
@Entity()
export class Roles extends Base {
  @Column()
  role: string;
  @Column()
  code: string;
  @Column()
  secret: string;
  @OneToMany(() => Users, (user) => user.roles)
  users: Users[];
}
