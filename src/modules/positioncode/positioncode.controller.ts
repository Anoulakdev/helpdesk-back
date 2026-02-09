import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PositioncodeService } from './positioncode.service';
// import { CreatePositioncodeDto } from './dto/create-positioncode.dto';
// import { UpdatePositioncodeDto } from './dto/update-positioncode.dto';

@Controller('positioncodes')
export class PositioncodeController {
  constructor(private readonly positioncodeService: PositioncodeService) {}

  @Post()
  create() {
    return this.positioncodeService.create();
  }

  @Get()
  findAll() {
    return this.positioncodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positioncodeService.findOne(+id);
  }
}
