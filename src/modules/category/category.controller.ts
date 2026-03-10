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
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categorys')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(2)
  create(
    @Req() req: UserRequest,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(req.user, createCategoryDto);
  }

  @Get()
  @Roles(2)
  findAll(@Req() req: UserRequest) {
    return this.categoryService.findAll(req.user);
  }

  @Get('selectcategory')
  selectCategory(
    @Req() req: UserRequest,
    @Query('headCategoryId') headCategoryId?: number,
  ) {
    return this.categoryService.selectCategory(req.user, headCategoryId);
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, req.user, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
