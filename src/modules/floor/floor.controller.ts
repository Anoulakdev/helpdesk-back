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
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('floors')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  @Roles(1)
  create(@Body() createFloorDto: CreateFloorDto) {
    return this.floorService.create(createFloorDto);
  }

  @Get()
  @Roles(1)
  findAll() {
    return this.floorService.findAll();
  }

  @Get('selectfloor')
  selectFloor(@Query('buildingId') buildingId?: number) {
    return this.floorService.selectFloor(buildingId);
  }

  @Get(':id')
  @Roles(1)
  findOne(@Param('id') id: string) {
    return this.floorService.findOne(+id);
  }

  @Put(':id')
  @Roles(1)
  update(@Param('id') id: string, @Body() updateFloorDto: UpdateFloorDto) {
    return this.floorService.update(+id, updateFloorDto);
  }

  @Delete(':id')
  @Roles(1)
  remove(@Param('id') id: string) {
    return this.floorService.remove(+id);
  }
}
