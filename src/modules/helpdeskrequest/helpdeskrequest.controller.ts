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
  UploadedFiles,
  UseGuards,
  Query,
} from '@nestjs/common';
import { HelpdeskrequestService } from './helpdeskrequest.service';
import { CreateHelpdeskrequestDto } from './dto/create-helpdeskrequest.dto';
import { UpdateHelpdeskrequestDto } from './dto/update-helpdeskrequest.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('helpdeskrequests')
export class HelpdeskrequestController {
  constructor(
    private readonly helpdeskrequestService: HelpdeskrequestService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'hdFile', maxCount: 1 },
        { name: 'hdImgs', maxCount: 5 },
      ],
      multerConfig(),
    ),
  )
  create(
    @UploadedFiles()
    files: {
      hdFile?: Express.Multer.File[];
      hdImgs?: Express.Multer.File[];
    },
    @Req() req: UserRequest,
    @Body() createHelpdeskrequestDto: CreateHelpdeskrequestDto,
  ) {
    const hdFileName = files.hdFile?.[0]?.filename;
    const hdImgNames = files.hdImgs?.map((file) => file.filename) || [];

    return this.helpdeskrequestService.create(
      req.user,
      createHelpdeskrequestDto,
      hdFileName,
      hdImgNames,
    );
  }

  @Get('admin')
  adminFindAll(
    @Req() req: UserRequest,
    @Query('helpdeskStatusId') helpdeskStatusId?: number,
  ) {
    return this.helpdeskrequestService.adminFindAll(req.user, helpdeskStatusId);
  }

  @Get('user')
  userFindAll(
    @Req() req: UserRequest,
    @Query('helpdeskStatusId') helpdeskStatusId?: number,
  ) {
    return this.helpdeskrequestService.userFindAll(req.user, helpdeskStatusId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpdeskrequestService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'hdFile', maxCount: 1 },
        { name: 'hdImgs', maxCount: 5 },
      ],
      multerConfig(),
    ),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      hdFile?: Express.Multer.File[];
      hdImgs?: Express.Multer.File[];
    },
    @Body() updateHelpdeskrequestDto: UpdateHelpdeskrequestDto,
  ) {
    const hdFileName = files.hdFile?.[0]?.filename;
    const hdImgNames = files.hdImgs?.map((file) => file.filename) || [];

    if (hdFileName) {
      updateHelpdeskrequestDto.hdFile = hdFileName;
    }

    if (hdImgNames.length) {
      updateHelpdeskrequestDto.hdImgs = hdImgNames;
    }

    return this.helpdeskrequestService.update(+id, updateHelpdeskrequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpdeskrequestService.remove(+id);
  }
}
