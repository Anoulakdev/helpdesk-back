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
import { TurningService } from './turning.service';
import { CreateTurningDto } from './dto/create-turning.dto';
import { UpdateTurningDto } from './dto/update-turning.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('turnings')
export class TurningController {
  constructor(private readonly turningService: TurningService) {}

  @Post()
  @Roles(1)
  create(@Body() createTurningDto: CreateTurningDto) {
    return this.turningService.create(createTurningDto);
  }

  @Get()
  @Roles(1)
  findAll() {
    return this.turningService.findAll();
  }

  @Get('selectturning')
  selectTurning() {
    return this.turningService.selectTurning();
  }

  @Get(':id')
  @Roles(1)
  findOne(@Param('id') id: string) {
    return this.turningService.findOne(+id);
  }

  @Put(':id')
  @Roles(1)
  update(@Param('id') id: string, @Body() updateTurningDto: UpdateTurningDto) {
    return this.turningService.update(+id, updateTurningDto);
  }

  @Delete(':id')
  @Roles(1)
  remove(@Param('id') id: string) {
    return this.turningService.remove(+id);
  }
}
