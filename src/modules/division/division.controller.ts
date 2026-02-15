import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DivisionService } from './division.service';
// import { CreateDivisionDto } from './dto/create-division.dto';
// import { UpdateDivisionDto } from './dto/update-division.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('divisions')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  create() {
    return this.divisionService.create();
  }

  @Get()
  findAll(@Query('departmentId') departmentId?: number) {
    return this.divisionService.findAll(departmentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divisionService.findOne(+id);
  }
}
