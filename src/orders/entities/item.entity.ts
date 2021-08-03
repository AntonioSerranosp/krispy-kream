import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @ManyToMany((type) => OrderEntity, (order) => order.items)
  orders: OrderEntity[];
}
