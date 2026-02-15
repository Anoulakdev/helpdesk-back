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

@UseGuards(JwtAuthGuard)
@Controller('turnings')
export class TurningController {
  constructor(private readonly turningService: TurningService) {}

  @Post()
  create(@Body() createTurningDto: CreateTurningDto) {
    return this.turningService.create(createTurningDto);
  }

  @Get()
  findAll() {
    return this.turningService.findAll();
  }

  @Get('selectturning')
  selectTurning() {
    return this.turningService.selectTurning();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turningService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTurningDto: UpdateTurningDto) {
    return this.turningService.update(+id, updateTurningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turningService.remove(+id);
  }
}
