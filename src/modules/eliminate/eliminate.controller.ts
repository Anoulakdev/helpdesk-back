import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { EliminateService } from './eliminate.service';
import { CreateEliminateDto } from './dto/create-eliminate.dto';
import { UpdateEliminateDto } from './dto/update-eliminate.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FileInterceptor('eliminatefile', multerConfig('eliminate')))
@Controller('eliminates')
export class EliminateController {
  constructor(private readonly eliminateService: EliminateService) {}

  @Post()
  @Roles(2)
  create(
    @UploadedFile() eliminatefile: Express.Multer.File,
    @Req() req: UserRequest,
    @Body() createEliminateDto: CreateEliminateDto,
  ) {
    const Eliminatefilename = eliminatefile?.filename;
    if (Eliminatefilename) {
      createEliminateDto.eliminatefile = Eliminatefilename;
    }
    return this.eliminateService.create(
      createEliminateDto,
      req.user,
      Eliminatefilename,
    );
  }

  @Get()
  @Roles(2)
  findAll(@Req() req: UserRequest) {
    return this.eliminateService.findAll(req.user);
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.eliminateService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @UploadedFile() eliminatefile: Express.Multer.File,
    @Body() updateEliminateDto: UpdateEliminateDto,
  ) {
    if (eliminatefile) {
      updateEliminateDto.eliminatefile = eliminatefile.filename;
    }
    return this.eliminateService.update(+id, req.user, updateEliminateDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.eliminateService.remove(+id);
  }
}
