import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/user.entity';
import { OrderEntity } from './orders/entities/order.entity';
import { ItemEntity } from './orders/entities/item.entity';

@Module({
  imports: [
    OrdersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Odontocode2',
      database: 'krispy',
      entities: [OrderEntity, User, ItemEntity],
      //autoLoadEntities: true, // models will be loaded automatically
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
