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

@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('catIcon', multerConfig('categoryicon')))
@Controller('categoryicons')
export class CategoryiconController {
  constructor(private readonly categoryiconService: CategoryiconService) {}

  @Post()
  uploadMaintenanceFile(
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
  findAll() {
    return this.categoryiconService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryiconService.findOne(+id);
  }

  @Put(':id')
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
  remove(@Param('id') id: string) {
    return this.categoryiconService.remove(+id);
  }
}
