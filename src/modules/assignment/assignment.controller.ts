import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Req,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FileInterceptor('commentImg', multerConfig('commentimg')))
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @Roles(2)
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get()
  @Roles(2, 3)
  findAll(
    @Req() req: UserRequest,
    @Query('helpdeskStatusId') helpdeskStatusId?: number,
  ) {
    return this.assignmentService.findAll(req.user, helpdeskStatusId);
  }

  @Put('accept')
  @Roles(2, 3)
  acceptAssignment(@Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentService.acceptAssignment(updateAssignmentDto);
  }

  @Put(':id')
  @Roles(2, 3)
  update(
    @Param('id') id: string,
    @UploadedFile() commentImg: Express.Multer.File,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    if (commentImg) {
      updateAssignmentDto.commentImg = commentImg.filename;
    }
    return this.assignmentService.update(+id, updateAssignmentDto);
  }
}
