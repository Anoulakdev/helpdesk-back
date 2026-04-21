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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Roles(2)
  create(@Req() req: UserRequest, @Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(req.user, createBrandDto);
  }

  @Get()
  @Roles(2)
  findAll(@Req() req: UserRequest) {
    return this.brandService.findAll(req.user);
  }

  @Get('selectbrand')
  selectBrand(@Query('typeDeviceId') typeDeviceId?: number) {
    return this.brandService.selectBrand(typeDeviceId);
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(+id, req.user, updateBrandDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
