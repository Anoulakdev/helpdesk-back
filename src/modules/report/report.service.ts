import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { reportTicket } from './services/ticket';
import { reportCategory } from './services/category';
import { reportDepartment } from './services/department';
import { reportRepair } from './services/repair';
import { reportStaff } from './services/staff';
import { numberskt } from './services/numberskt';
import { reportEliminate } from './services/eliminate';
@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  reportCategory(user: AuthUser, startDate: string, endDate: string) {
    return reportCategory(this.prisma, user, startDate, endDate);
  }

  reportTicket(user: AuthUser, startDate: string, endDate: string) {
    return reportTicket(this.prisma, user, startDate, endDate);
  }

  reportDepartment(user: AuthUser, startDate: string, endDate: string) {
    return reportDepartment(this.prisma, user, startDate, endDate);
  }

  reportRepair(
    user: AuthUser,
    startDate: string,
    endDate: string,
    helpdeskStatusId?: number,
  ) {
    return reportRepair(
      this.prisma,
      user,
      startDate,
      endDate,
      helpdeskStatusId,
    );
  }

  reportStaff(
    user: AuthUser,
    startDate: string,
    endDate: string,
    helpdeskStatusId?: number,
  ) {
    return reportStaff(this.prisma, user, startDate, endDate, helpdeskStatusId);
  }

  numberskt(numberSKT: string) {
    return numberskt(this.prisma, numberSKT);
  }

  reportEliminate(user: AuthUser, startDate: string, endDate: string) {
    return reportEliminate(this.prisma, user, startDate, endDate);
  }
}
