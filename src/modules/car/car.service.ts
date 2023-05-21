import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateCarDto, CreateCarDto } from './dto';
import { I_Car } from './interface';
import { Car } from './schemas';
import { Owner } from 'modules/owner/schemas';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<I_Car>) {}

  public async getAllCars(): Promise<I_Car[]> {
    return await this.carModel.find().select(['-price']);
  }

  public async getCarDetail(carId: string): Promise<I_Car> {
    try {
      return await this.carModel.findById(carId);
    } catch (err) {
      throw new NotFoundException('Car does not exist');
    }
  }

  public async createNewCar(createCarDto: CreateCarDto): Promise<I_Car> {
    try {
      const newCar = new this.carModel(createCarDto);
      return await newCar.save();
    } catch (error) {
      throw new UnprocessableEntityException(
        'Car with the same price already exists',
      );
    }
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

  public async addCarToOwner(ownerId: string, carId: string): Promise<I_Car> {
    return await this.carModel.findByIdAndUpdate(
      carId,
      { $addToSet: { owners: ownerId } },
      { new: true },
    );
  }

  public async getAllOwners(carId: string): Promise<Owner[]> {
    const cars = await this.carModel.findById(carId).populate('owners');

    return cars.owners;
  }
}
