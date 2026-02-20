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
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('prioritys')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post()
  @Roles(1)
  create(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.create(createPriorityDto);
  }

  @Get()
  @Roles(1)
  findAll() {
    return this.priorityService.findAll();
  }

  @Get('selectpriority')
  selectPriority() {
    return this.priorityService.selectPriority();
  }

  @Get(':id')
  @Roles(1)
  findOne(@Param('id') id: string) {
    return this.priorityService.findOne(+id);
  }

  @Put(':id')
  @Roles(1)
  update(
    @Param('id') id: string,
    @Body() updatePriorityDto: UpdatePriorityDto,
  ) {
    return this.priorityService.update(+id, updatePriorityDto);
  }

  @Delete(':id')
  @Roles(1)
  remove(@Param('id') id: string) {
    return this.priorityService.remove(+id);
  }
}
