import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
// import { CreateDepartmentDto } from './dto/create-department.dto';
// import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create() {
    return this.departmentService.create();
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }
}
