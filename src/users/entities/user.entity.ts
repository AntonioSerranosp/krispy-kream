import { OrderEntity } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  phone: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: false })
  role: string;
  @Column()
  password: string;
  @OneToMany((type) => OrderEntity, (order) => order.user)
  order: OrderEntity[];
}
