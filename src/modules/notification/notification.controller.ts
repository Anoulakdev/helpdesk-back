import { Controller, Get, Put, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRequest } from '../../interfaces/user-request.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notifications')
@Roles(2, 3, 4)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(@Req() req: UserRequest) {
    return this.notificationService.findAll(req.user.id);
  }

  @Put('readall')
  markAllAsRead(@Req() req: UserRequest) {
    return this.notificationService.markAllAsRead(req.user.id);
  }

  @Put(':id/read')
  markAsRead(@Req() req: UserRequest, @Param('id') id: string) {
    return this.notificationService.markAsRead(req.user.id, +id);
  }
}
