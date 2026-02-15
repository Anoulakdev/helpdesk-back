import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('prioritys')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post()
  create(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.create(createPriorityDto);
  }

  @Get()
  findAll() {
    return this.priorityService.findAll();
  }

  @Get('selectpriority')
  selectPriority() {
    return this.priorityService.selectPriority();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priorityService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePriorityDto: UpdatePriorityDto,
  ) {
    return this.priorityService.update(+id, updatePriorityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priorityService.remove(+id);
  }
}
