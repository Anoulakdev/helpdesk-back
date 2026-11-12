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
  Req,
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('floors')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  @Roles(1, 2)
  create(@Body() createFloorDto: CreateFloorDto) {
    return this.floorService.create(createFloorDto);
  }

  @Get()
  @Roles(1, 2)
  findAll(@Req() req: UserRequest) {
    return this.floorService.findAll(req.user);
  }

  @Get('selectfloor')
  selectFloor(@Query('buildingId') buildingId?: number) {
    return this.floorService.selectFloor(buildingId);
  }

  @Get(':id')
  @Roles(1, 2)
  findOne(@Param('id') id: string) {
    return this.floorService.findOne(+id);
  }

  @Put(':id')
  @Roles(1, 2)
  update(@Param('id') id: string, @Body() updateFloorDto: UpdateFloorDto) {
    return this.floorService.update(+id, updateFloorDto);
  }

  @Delete(':id')
  @Roles(1, 2)
  remove(@Param('id') id: string) {
    return this.floorService.remove(+id);
  }
}
