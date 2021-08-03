import { IsInt, IsNumber, IsObject, IsString } from 'class-validator';
import { ItemEntity } from '../entities/item.entity';

export class CreateOrderDto {
  @IsString()
  status: string;
  @IsString()
  paymentMethod: string;
  @IsInt()
  total: number;
  @IsInt()
  subtotal: number;
  @IsString()
  codeDiscount?: string;
  @IsNumber()
  discount?: number;
  @IsInt()
  idRepartidor: number;

  @IsString()
  nameRepartidor: string;
  // @IsInt()
  // idClient: number;
  items: ItemEntity[];
}
