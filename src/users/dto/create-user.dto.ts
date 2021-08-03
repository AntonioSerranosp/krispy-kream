import { IsEmail, IsInt, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  password: string;
  @IsString()
  role: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
}
