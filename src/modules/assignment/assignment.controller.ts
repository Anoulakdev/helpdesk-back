import {
  Controller,
  Get,
  Post,
  Body,
  // Put,
  // Param,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
// import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
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
}
