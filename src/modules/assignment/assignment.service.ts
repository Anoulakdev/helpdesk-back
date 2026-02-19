import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
// import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createAssignment } from './services/create';
import { findAllAssignment } from './services/findall';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  create(createAssignmentDto: CreateAssignmentDto) {
    return createAssignment(this.prisma, createAssignmentDto);
  }

  findAll(user: AuthUser, helpdeskStatusId?: number) {
    return findAllAssignment(this.prisma, user, helpdeskStatusId);
  }
}
