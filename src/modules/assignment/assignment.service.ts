import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createAssignment } from './services/create';
import { findAllAssignment } from './services/findall';
import { acceptAssignment } from './services/accept';
import { updateAssignment } from './services/update';
import { notifyHelpdeskUpdate } from '../../utils/event-bus';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const result = await createAssignment(this.prisma, createAssignmentDto);
    notifyHelpdeskUpdate();
    return result;
  }

  findAll(
    user: AuthUser,
    helpdeskStatusId?: number,
    page?: number,
    limit?: number,
  ) {
    return findAllAssignment(this.prisma, user, helpdeskStatusId, page, limit);
  }

  async acceptAssignment(updateAssignmentDto: UpdateAssignmentDto) {
    const result = await acceptAssignment(this.prisma, updateAssignmentDto);
    notifyHelpdeskUpdate();
    return result;
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const result = await updateAssignment(this.prisma, id, updateAssignmentDto);
    notifyHelpdeskUpdate();
    return result;
  }
}
