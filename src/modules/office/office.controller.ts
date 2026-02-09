import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { OfficeService } from './office.service';
// import { CreateOfficeDto } from './dto/create-office.dto';
// import { UpdateOfficeDto } from './dto/update-office.dto';

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post()
  create() {
    return this.officeService.create();
  }

  @Get()
  findAll(@Query('divisionId') divisionId?: number) {
    return this.officeService.findAll(divisionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officeService.findOne(+id);
  }
}
