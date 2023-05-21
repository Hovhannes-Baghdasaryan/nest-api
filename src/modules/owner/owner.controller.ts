import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto';

@Controller('owners')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Get(':ownerId')
  async getOwners(@Param('ownerId') ownerId: string) {
    return this.ownerService.getOwner(ownerId);
  }

  @Post()
  async createOwner(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.createOwner(createOwnerDto);
  }
}
