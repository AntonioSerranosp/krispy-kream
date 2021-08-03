import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from 'src/users/users.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private UserService: UsersService,
  ) {}
  /**
   *
   * @param createOrderDto
   * @returns
   */
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  /**
   *
   * @returns  all the orders
   */
  @Get()
  async findAll() {
    const orderArray = await this.ordersService.findAll();

    orderArray.forEach((order) => {
      const userInfo = order.user;
      const { name, phone, firstName } = userInfo;
      const orderWithUser = {
        phone,
        name: `${name} ${firstName}`,
      };

      order.user = orderWithUser;
    });
    return orderArray;
  }
  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);

    const userInfo = order.user;
    const { name, phone, firstName } = userInfo;
    const orderWithUser = {
      phone,
      name: `${name} ${firstName}`,
    };

    order.user = orderWithUser;
    return order;
  }
  /**
   *
   * @param id
   * @param updateOrderDto
   * @returns
   */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
