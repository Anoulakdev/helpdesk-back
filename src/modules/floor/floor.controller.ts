import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('floors')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  create(@Body() createFloorDto: CreateFloorDto) {
    return this.floorService.create(createFloorDto);
  }

  @Get()
  findAll() {
    return this.floorService.findAll();
  }

  @Get('selectfloor')
  selectFloor(@Query('buildingId') buildingId?: number) {
    return this.floorService.selectFloor(buildingId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFloorDto: UpdateFloorDto) {
    return this.floorService.update(+id, updateFloorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floorService.remove(+id);
  }
}
