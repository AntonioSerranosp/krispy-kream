import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status;
  @Column({ unique: true })
  sku;
  @Column()
  paymentMethod;
  @Column()
  total;
  @Column()
  subtotal;
  @Column({ nullable: true })
  codeDiscount;
  @Column({ nullable: true })
  discount;
  @Column()
  idRepartidor;
  @Column()
  nameRepatidor;
}
