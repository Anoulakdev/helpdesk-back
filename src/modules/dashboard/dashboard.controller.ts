import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboards')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('countrepair')
  @Roles(1, 2)
  countRepair(@Req() req: UserRequest) {
    return this.dashboardService.countRepair(req.user);
  }

  @Get('countcategory')
  @Roles(1, 2)
  countCategory(@Req() req: UserRequest) {
    return this.dashboardService.countCategory(req.user);
  }

  @Get('countticket')
  @Roles(1, 2)
  countTicket(@Req() req: UserRequest) {
    return this.dashboardService.countTicket(req.user);
  }

  @Get('counthelpdesk')
  @Roles(1, 2)
  countHelpDesk(@Req() req: UserRequest) {
    return this.dashboardService.countHelpDesk(req.user);
  }

  @Get('getnoti')
  @Roles(1, 2)
  getNoti(@Req() req: UserRequest) {
    return this.dashboardService.getNoti(req.user);
  }
}
