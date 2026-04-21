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
  Query,
} from '@nestjs/common';
import { TypedeviceService } from './typedevice.service';
import { CreateTypedeviceDto } from './dto/create-typedevice.dto';
import { UpdateTypedeviceDto } from './dto/update-typedevice.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('typedevices')
export class TypedeviceController {
  constructor(private readonly typedeviceService: TypedeviceService) {}

  @Post()
  @Roles(2)
  create(
    @Req() req: UserRequest,
    @Body() createTypedeviceDto: CreateTypedeviceDto,
  ) {
    return this.typedeviceService.create(req.user, createTypedeviceDto);
  }

  @Get()
  @Roles(2)
  findAll(@Req() req: UserRequest) {
    return this.typedeviceService.findAll(req.user);
  }

  @Get('selecttypedevice')
  selectTypeDevice(
    @Req() req: UserRequest,
    @Query('ticketId') ticketId: number,
  ) {
    return this.typedeviceService.selectTypeDevice(req.user, ticketId);
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.typedeviceService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateTypedeviceDto: UpdateTypedeviceDto,
  ) {
    return this.typedeviceService.update(+id, req.user, updateTypedeviceDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.typedeviceService.remove(+id);
  }
}
