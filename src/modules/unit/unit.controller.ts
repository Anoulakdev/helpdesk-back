import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UnitService } from './unit.service';
// import { CreateUnitDto } from './dto/create-unit.dto';
// import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create() {
    return this.unitService.create();
  }

  @Get()
  findAll(
    @Query('divisionId') divisionId?: number,
    @Query('officeId') officeId?: number,
  ) {
    return this.unitService.findAll(divisionId, officeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }
}
