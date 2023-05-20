import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarModule } from './modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cars'),
    CarModule,
  ],
})
export class AppModule {}
