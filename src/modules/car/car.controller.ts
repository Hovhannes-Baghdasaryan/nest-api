import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './dto';
import { CarService } from './car.service';

@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async getCars() {
    return await this.carService.getAllCars();
  }

  @Get(':id')
  async getDetail(@Param('id') carId: string) {
    return await this.carService.getCarDetail(carId);
  }

  @Post()
  async createCar(@Body() createCarDto: CreateCarDto) {
    return await this.carService.createNewCar(createCarDto);
  }

  @Put(':id')
  async updateCar(
    @Param('id') carId: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return await this.carService.updateCar(carId, updateCarDto);
  }
}
