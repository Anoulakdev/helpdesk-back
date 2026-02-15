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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categorys')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Req() req: UserRequest,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(req.user, createCategoryDto);
  }

  @Get()
  findAll(@Req() req: UserRequest) {
    return this.categoryService.findAll(req.user);
  }

  @Get('selectcategory')
  selectCategory(@Query('headCategoryId') headCategoryId?: number) {
    return this.categoryService.selectCategory(headCategoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, req.user, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
