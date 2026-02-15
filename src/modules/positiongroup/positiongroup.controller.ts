import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PositiongroupService } from './positiongroup.service';
// import { CreatePositiongroupDto } from './dto/create-positiongroup.dto';
// import { UpdatePositiongroupDto } from './dto/update-positiongroup.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('positiongroups')
export class PositiongroupController {
  constructor(private readonly positiongroupService: PositiongroupService) {}

  @Post()
  create() {
    return this.positiongroupService.create();
  }

  @Get()
  findAll() {
    return this.positiongroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positiongroupService.findOne(+id);
  }
}
