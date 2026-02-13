import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HeadcategoryService } from './headcategory.service';
import { CreateHeadcategoryDto } from './dto/create-headcategory.dto';
import { UpdateHeadcategoryDto } from './dto/update-headcategory.dto';

@Controller('headcategorys')
export class HeadcategoryController {
  constructor(private readonly headcategoryService: HeadcategoryService) {}

  @Post()
  create(@Body() createHeadcategoryDto: CreateHeadcategoryDto) {
    return this.headcategoryService.create(createHeadcategoryDto);
  }

  @Get()
  findAll() {
    return this.headcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headcategoryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeadcategoryDto: UpdateHeadcategoryDto,
  ) {
    return this.headcategoryService.update(+id, updateHeadcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headcategoryService.remove(+id);
  }
}
