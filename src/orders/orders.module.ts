import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities/order.entity';
import { ItemEntity } from './entities/item.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ItemEntity]), UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
