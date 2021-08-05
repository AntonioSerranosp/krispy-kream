import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const userhash = {
      ...createUserDto,
      password: hashedPassword,
    };
    const newUser = await this.usersService.create(userhash).catch((err) => {
      console.log(err, '--->');
      throw new BadRequestException(`El usuario ya existe con este email`);
    });
    // const newUser = await this.usersService.create(createUserDto);

    // return newUser;
    const payload = { id: newUser.name };
    const jwt = await this.jwtService.signAsync(payload);
    const userLogin = {
      ...newUser,
      token: jwt,
    };
    return userLogin;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne('' + id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Post('login')
  async login(@Body() logingPayload) {
    const { email, password } = logingPayload;
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException(`No existe una cuenta con este email`);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException(`Password invalido`);
    }
    const payload = { id: user.id };
    const jwt = await this.jwtService.signAsync(payload);
    const userLogin = {
      ...user,
      token: jwt,
    };
    return userLogin;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
