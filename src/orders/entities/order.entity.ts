import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemEntity } from './item.entity';
@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: string;
  @Column()
  paymentMethod: string;
  @Column()
  subtotal: number;
  @Column()
  total: number;
  @Column({ unique: true })
  codeDiscount: string;
  @Column()
  discount: number;
  @Column()
  idRepartidor: number;

  @Column()
  nameRepartidor: string;
  // @Column()
  // idClient: number;
  @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    (type) => ItemEntity,
    (item) => item.orders, // what is "coffee" within the Flavor Entity
    {
      cascade: true,
    },
  ) // 👈
  items: ItemEntity[];

  @ManyToOne((type) => User, (user) => user.order)
  user: any;
}
