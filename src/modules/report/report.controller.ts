import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('category')
  @Roles(2)
  reportCategory(
    @Req() req: UserRequest,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.reportCategory(req.user, startDate, endDate);
  }

  @Get('ticket')
  @Roles(2)
  reportTicket(
    @Req() req: UserRequest,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.reportTicket(req.user, startDate, endDate);
  }

  @Get('department')
  @Roles(2)
  reportDepartment(
    @Req() req: UserRequest,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.reportDepartment(req.user, startDate, endDate);
  }

  @Get('repair')
  @Roles(2)
  reportRepair(
    @Req() req: UserRequest,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.reportRepair(req.user, startDate, endDate);
  }

  @Get('staff')
  @Roles(2, 3)
  reportStaff(
    @Req() req: UserRequest,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.reportStaff(req.user, startDate, endDate);
  }

  @Get('numberskt')
  @Roles(2, 3)
  numberskt(@Query('numberSKT') numberSKT: string) {
    return this.reportService.numberskt(numberSKT);
  }

  @Get('eliminate')
  @Roles(2)
  reportEliminate(
    @Req() req: UserRequest,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.reportEliminate(req.user, startDate, endDate);
  }
}
