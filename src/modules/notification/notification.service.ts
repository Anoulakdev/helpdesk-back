import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { notificationUpdate$, notifyNotificationUpdate } from '../../utils/event-bus';
import { Observable } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  getNotificationStream(userId: number): Observable<any> {
    return notificationUpdate$.pipe(
      debounceTime(100),
      startWith(null),
      switchMap(() => this.findAll(userId)),
    );
  }

  async findAll(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
      include: {
        helpdeskRequest: {
          select: {
            id: true,
            ticket: {
              select: {
                title: true,
              },
            },
          },
        },
        chat: {
          select: {
            id: true,
            message: true,
            createdAt: true,
            sender: {
              select: {
                id: true,
                username: true,
                employee: {
                  select: {
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async markAsRead(userId: number, id: number) {
    const result = await this.prisma.notification.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        isRead: true,
      },
    });
    notifyNotificationUpdate();
    return result;
  }

  async markAllAsRead(userId: number) {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
    notifyNotificationUpdate();
    return result;
  }
}
