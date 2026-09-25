import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { countRepair } from './services/repair';
import { countCategory } from './services/category';
import { countTicket } from './services/ticket';
import { countHelpDesk } from './services/helpdesk';
import { getNoti } from './services/getnoti';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  countRepair(user: AuthUser) {
    return countRepair(this.prisma, user);
  }

  countCategory(user: AuthUser) {
    return countCategory(this.prisma, user);
  }

  countTicket(user: AuthUser) {
    return countTicket(this.prisma, user);
  }

  countHelpDesk(user: AuthUser) {
    return countHelpDesk(this.prisma, user);
  }

  getNoti(user: AuthUser) {
    return getNoti(this.prisma, user);
  }
}
