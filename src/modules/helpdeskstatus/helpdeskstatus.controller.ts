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
import { HelpdeskstatusService } from './helpdeskstatus.service';
import { CreateHelpdeskstatusDto } from './dto/create-helpdeskstatus.dto';
import { UpdateHelpdeskstatusDto } from './dto/update-helpdeskstatus.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('helpdeskstatus')
export class HelpdeskstatusController {
  constructor(private readonly helpdeskstatusService: HelpdeskstatusService) {}

  @Post()
  @Roles(1)
  create(@Body() createHelpdeskstatusDto: CreateHelpdeskstatusDto) {
    return this.helpdeskstatusService.create(createHelpdeskstatusDto);
  }

  @Get()
  @Roles(1)
  findAll() {
    return this.helpdeskstatusService.findAll();
  }

  @Get('selecthelpdeskstatus')
  selectHelpdeskStatus() {
    return this.helpdeskstatusService.selectHelpdeskStatus();
  }

  @Get(':id')
  @Roles(1)
  findOne(@Param('id') id: string) {
    return this.helpdeskstatusService.findOne(+id);
  }

  @Put(':id')
  @Roles(1)
  update(
    @Param('id') id: string,
    @Body() updateHelpdeskstatusDto: UpdateHelpdeskstatusDto,
  ) {
    return this.helpdeskstatusService.update(+id, updateHelpdeskstatusDto);
  }

  @Delete(':id')
  @Roles(1)
  remove(@Param('id') id: string) {
    return this.helpdeskstatusService.remove(+id);
  }
}
