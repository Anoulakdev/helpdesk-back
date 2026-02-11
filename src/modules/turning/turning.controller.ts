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

@Controller('turnings')
export class TurningController {
  constructor(private readonly turningService: TurningService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTurningDto: CreateTurningDto) {
    return this.turningService.create(createTurningDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.turningService.findAll();
  }

  @Get('selectturning')
  selectTurning() {
    return this.turningService.selectTurning();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turningService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTurningDto: UpdateTurningDto) {
    return this.turningService.update(+id, updateTurningDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turningService.remove(+id);
  }
}
