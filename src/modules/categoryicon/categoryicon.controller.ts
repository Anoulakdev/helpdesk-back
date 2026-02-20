import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { CategoryiconService } from './categoryicon.service';
import { CreateCategoryiconDto } from './dto/create-categoryicon.dto';
import { UpdateCategoryiconDto } from './dto/update-categoryicon.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FileInterceptor('catIcon', multerConfig('categoryicon')))
@Controller('categoryicons')
export class CategoryiconController {
  constructor(private readonly categoryiconService: CategoryiconService) {}

  @Post()
  @Roles(1)
  uploadCategoryicon(
    @UploadedFile() catIcon: Express.Multer.File,
    @Body() createCategoryiconDto: CreateCategoryiconDto,
  ) {
    const CatIconfilename = catIcon?.filename;
    if (CatIconfilename) {
      createCategoryiconDto.catIcon = CatIconfilename;
    }

    return this.categoryiconService.create(
      createCategoryiconDto,
      CatIconfilename,
    );
  }

  @Get()
  @Roles(1)
  findAll() {
    return this.categoryiconService.findAll();
  }

  @Get('selectcategoryicon')
  selectCategoryIcon() {
    return this.categoryiconService.selectCategoryIcon();
  }

  @Get(':id')
  @Roles(1)
  findOne(@Param('id') id: string) {
    return this.categoryiconService.findOne(+id);
  }

  @Put(':id')
  @Roles(1)
  update(
    @Param('id') id: string,
    @UploadedFile() catIcon: Express.Multer.File,
    @Body() updateCategoryiconDto: UpdateCategoryiconDto,
  ) {
    if (catIcon) {
      updateCategoryiconDto.catIcon = catIcon.filename;
    }
    return this.categoryiconService.update(+id, updateCategoryiconDto);
  }

  @Delete(':id')
  @Roles(1)
  remove(@Param('id') id: string) {
    return this.categoryiconService.remove(+id);
  }
}
