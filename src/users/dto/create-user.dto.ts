import { IsInt, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly role: string;
  @IsString()
  readonly email: string;
  @IsString()
  phone: string;
}
