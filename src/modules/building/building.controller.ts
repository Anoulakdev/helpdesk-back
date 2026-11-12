import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @Roles(1, 2)
  create(
    @Req() req: UserRequest,
    @Body() createBuildingDto: CreateBuildingDto,
  ) {
    return this.buildingService.create(req.user, createBuildingDto);
  }

  @Get()
  @Roles(1, 2)
  findAll(@Req() req: UserRequest) {
    return this.buildingService.findAll(req.user);
  }

  @Get('selectbuilding')
  selectBuilding(@Req() req: UserRequest) {
    return this.buildingService.selectBuilding(req.user);
  }

  @Get(':id')
  @Roles(1, 2)
  findOne(@Param('id') id: string) {
    return this.buildingService.findOne(+id);
  }

  @Put(':id')
  @Roles(1, 2)
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ) {
    return this.buildingService.update(+id, updateBuildingDto);
  }

  @Delete(':id')
  @Roles(1, 2)
  remove(@Param('id') id: string) {
    return this.buildingService.remove(+id);
  }
}
