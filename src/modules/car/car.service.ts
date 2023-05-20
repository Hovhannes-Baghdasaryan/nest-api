import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateCarDto, CreateCarDto } from './dto';
import { I_Car } from './interface';
import { Car } from './schemas';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<I_Car>) {}

  public async getAllCars(): Promise<I_Car[]> {
    const cars = await this.carModel.find().select(['-year', '-price']);

    return cars;
  }

  public async getCarDetail(carId: string): Promise<I_Car> {
    const carDetail = await this.carModel.findById({ _id: carId });

    return carDetail;
  }

  public async createNewCar(createCarDto: CreateCarDto): Promise<I_Car> {
    const newCar = new this.carModel(createCarDto);

    return await newCar.save();
  }

  public async updateCar(
    carId: string,
    updateCarDto: UpdateCarDto,
  ): Promise<I_Car> {
    // mongoose has findByIdAndUpdate, it updated the collection, but returned the last one in response even with { new: true }
    // I replaced with findOneAndUpdate so it returns the payload I received
    const newCar = await this.carModel.findOneAndUpdate(
      { _id: carId },
      updateCarDto,
      { new: true },
    );

    return newCar;
  }
}
