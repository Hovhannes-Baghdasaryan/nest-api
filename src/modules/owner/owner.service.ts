import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOwnerDto } from './dto';
import { I_Owner } from './interface';
import { Owner } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner.name) private readonly ownerModel: Model<I_Owner>,
  ) {}

  public async getOwner(ownerId: string): Promise<I_Owner> {
    try {
      return await this.ownerModel.findById(ownerId);
    } catch (err) {
      throw new NotFoundException('Owner does not exist');
    }
  }

  public async createOwner(createOwnerDto: CreateOwnerDto): Promise<I_Owner> {
    const newCar = new this.ownerModel(createOwnerDto);

    return await newCar.save();
  }
}
