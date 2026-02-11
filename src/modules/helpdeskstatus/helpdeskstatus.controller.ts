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

@Controller('helpdeskstatus')
export class HelpdeskstatusController {
  constructor(private readonly helpdeskstatusService: HelpdeskstatusService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHelpdeskstatusDto: CreateHelpdeskstatusDto) {
    return this.helpdeskstatusService.create(createHelpdeskstatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.helpdeskstatusService.findAll();
  }

  @Get('selecthelpdeskstatus')
  selectHelpdeskStatus() {
    return this.helpdeskstatusService.selectHelpdeskStatus();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpdeskstatusService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHelpdeskstatusDto: UpdateHelpdeskstatusDto,
  ) {
    return this.helpdeskstatusService.update(+id, updateHelpdeskstatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpdeskstatusService.remove(+id);
  }
}
