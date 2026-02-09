import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PositionService } from './position.service';
// import { CreatePositionDto } from './dto/create-position.dto';
// import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create() {
    return this.positionService.create();
  }

  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }
}
