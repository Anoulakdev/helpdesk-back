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
import { HeadcategoryService } from './headcategory.service';
import { CreateHeadcategoryDto } from './dto/create-headcategory.dto';
import { UpdateHeadcategoryDto } from './dto/update-headcategory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('headcategorys')
export class HeadcategoryController {
  constructor(private readonly headcategoryService: HeadcategoryService) {}

  @Post()
  @Roles(1)
  create(@Body() createHeadcategoryDto: CreateHeadcategoryDto) {
    return this.headcategoryService.create(createHeadcategoryDto);
  }

  @Get()
  @Roles(1)
  findAll() {
    return this.headcategoryService.findAll();
  }

  @Get('selectheadcategory')
  selectHeadcategory() {
    return this.headcategoryService.selectHeadcategory();
  }

  @Get(':id')
  @Roles(1)
  findOne(@Param('id') id: string) {
    return this.headcategoryService.findOne(+id);
  }

  @Put(':id')
  @Roles(1)
  update(
    @Param('id') id: string,
    @Body() updateHeadcategoryDto: UpdateHeadcategoryDto,
  ) {
    return this.headcategoryService.update(+id, updateHeadcategoryDto);
  }

  @Delete(':id')
  @Roles(1)
  remove(@Param('id') id: string) {
    return this.headcategoryService.remove(+id);
  }
}
