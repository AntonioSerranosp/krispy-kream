import { IsInt, IsString } from 'class-validator';
export class CreateOrderDto {
  @IsString()
  status: string;
  @IsString()
  sku: string;
  @IsString()
  paymentMethod: string;
  @IsInt()
  total: number;
  @IsInt()
  subtotal: number;
  @IsString()
  codeDiscount?: string;
  @IsInt()
  discount?: number;
  @IsInt()
  idRepartidor;
  @IsString()
  nameRepatidor;
}
