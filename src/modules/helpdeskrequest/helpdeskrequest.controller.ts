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
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { HelpdeskrequestService } from './helpdeskrequest.service';
import { CreateHelpdeskrequestDto } from './dto/create-helpdeskrequest.dto';
import { UpdateHelpdeskrequestDto } from './dto/update-helpdeskrequest.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Observable, map } from 'rxjs';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('helpdeskrequests')
export class HelpdeskrequestController {
  constructor(
    private readonly helpdeskrequestService: HelpdeskrequestService,
  ) {}

  @Post()
  @Roles(2, 3, 4)
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

  @Sse('admin')
  @Roles(2)
  streamHDR(
    @Req() req: UserRequest,
    @Query('helpdeskStatusId') helpdeskStatusId?: number,
  ): Observable<MessageEvent> {
    return this.helpdeskrequestService.getAdminStream(req.user, helpdeskStatusId).pipe(
      map((data) => ({
        data,
        retry: 3000, // Reconnect within 3 seconds if disconnected
      })),
    );
  }

  // @Get('admin')
  // @Roles(2)
  // adminFindAll(
  //   @Req() req: UserRequest,
  //   @Query('helpdeskStatusId') helpdeskStatusId?: number,
  // ) {
  //   return this.helpdeskrequestService.adminFindAll(req.user, helpdeskStatusId);
  // }

  @Get('user')
  @Roles(2, 3, 4)
  userFindAll(
    @Req() req: UserRequest,
    @Query('helpdeskStatusId') helpdeskStatusId?: number,
  ) {
    return this.helpdeskrequestService.userFindAll(req.user, helpdeskStatusId);
  }

  @Get('history')
  @Roles(2, 3, 4)
  sktHistory(
    @Query('numberSKT') numberSKT: string,
    @Query('createdAt') createdAt: string,
  ) {
    return this.helpdeskrequestService.sktHistory(numberSKT, createdAt);
  }

  @Get(':id')
  @Roles(2, 3, 4)
  findOne(@Param('id') id: string) {
    return this.helpdeskrequestService.findOne(+id);
  }

  @Put(':id')
  @Roles(4)
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

  @Put('updatehelpdeskstatus/:id')
  @Roles(2, 3)
  updateHelpdeskStatus(
    @Param('id') id: string,
    @Body() updateHelpdeskrequestDto: UpdateHelpdeskrequestDto,
  ) {
    return this.helpdeskrequestService.updateHelpdeskStatus(
      +id,
      updateHelpdeskrequestDto,
    );
  }

  @Put('updatepriority/:id')
  @Roles(2)
  updatePriority(
    @Param('id') id: string,
    @Body() updateHelpdeskrequestDto: UpdateHelpdeskrequestDto,
  ) {
    return this.helpdeskrequestService.updatePriority(
      +id,
      updateHelpdeskrequestDto,
    );
  }

  @Delete(':id')
  @Roles(4)
  remove(@Param('id') id: string) {
    return this.helpdeskrequestService.remove(+id);
  }
}
