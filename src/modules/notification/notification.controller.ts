import { Controller, Put, Param, UseGuards, Req, Sse, MessageEvent } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notifications')
@Roles(2, 3, 4)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Sse()
  findAll(@Req() req: UserRequest): Observable<MessageEvent> {
    return this.notificationService.getNotificationStream(req.user.id).pipe(
      map((data) => ({
        data,
        retry: 3000, // Reconnect within 3 seconds if disconnected
      })),
    );
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
