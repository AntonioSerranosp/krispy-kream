import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities/order.entity';
import { ItemEntity } from './entities/item.entity';
import { UsersModule } from 'src/users/users.module';
import { ValidateJWTMiddleware } from './users.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ItemEntity]),
    JwtModule.register({
      secret: 'secretWord',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateJWTMiddleware)
      .exclude(
        { path: 'orders/:id', method: RequestMethod.GET },
        { path: 'orders', method: RequestMethod.GET },
      )
      .forRoutes('orders');
  }
}
