import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ItemEntity } from './entities/item.entity';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const items: any = await Promise.all(
      createOrderDto.items.map((item) => {
        return this.prealoadItemByName(item);
      }),
    );

    const order = this.orderRepository.create({
      ...createOrderDto,
      items,
    });
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['items', 'user'],
    });
  }

  findOne(id: string) {
    const order = this.orderRepository.findOne(id, {
      relations: ['items', 'user'],
    });
    if (!order) {
      throw new HttpException(
        `Order with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const items: any =
      updateOrderDto.items &&
      (await Promise.all(
        updateOrderDto.items.map((item) => this.prealoadItemByName(item)),
      ));
    const order = await this.orderRepository.preload({
      id: +id,
      ...updateOrderDto,
      items,
    });
    if (!order) {
      throw new NotFoundException(`order #${id} not found`);
    }

    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }
  /**
   *
   * @param name
   * @returns A item founded by name
   */
  private async prealoadItemByName(item) {
    const existingItem = await this.itemRepository.findOne({
      where: { name: item.name },
    });

    if (existingItem) {
      return existingItem;
    } else {
      const newItem = this.itemRepository.create(item);

      const itemInsert = await this.itemRepository.save(newItem);

      return itemInsert;
    }
  }
}
