import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { CreateChatDto } from '../dto/create-chat.dto';
import { notifyNotificationUpdate } from '../../../utils/event-bus';

export async function createChat(
  prisma: PrismaService,
  user: AuthUser,
  createChatDto: CreateChatDto,
) {
  const helpdeskRequestId = Number(createChatDto.helpdeskRequestId);

  const chat = await prisma.chat.create({
    data: {
      helpdeskRequestId,
      senderId: user.id,
      message: createChatDto.message,
    },
  });

  try {
    const helpdeskRequest = await prisma.helpdeskRequest.findUnique({
      where: { id: helpdeskRequestId },
      select: {
        createdById: true,
        ticket: {
          select: {
            category: {
              select: {
                headCategory: {
                  select: {
                    divisionId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (helpdeskRequest) {
      const divisionId =
        helpdeskRequest.ticket.category.headCategory.divisionId;
      const requestCreatorId = helpdeskRequest.createdById;
      const senderId = user.id;

      const isSenderCreator = senderId === requestCreatorId;
      const isSenderStaffOrManagerOfDivision =
        [2, 3].includes(user.roleId) &&
        user.employee?.divisionId === divisionId;

      if (isSenderCreator) {
        const targetUsers = await prisma.user.findMany({
          where: {
            roleId: { in: [2, 3] },
            employee: {
              divisionId: divisionId,
            },
            id: { not: senderId },
          },
          select: {
            id: true,
          },
        });

        if (targetUsers.length > 0) {
          await prisma.notification.createMany({
            data: targetUsers.map((u) => ({
              userId: u.id,
              helpdeskRequestId,
              chatId: chat.id,
              isRead: false,
            })),
          });
          notifyNotificationUpdate();
        }
      } else if (isSenderStaffOrManagerOfDivision) {
        if (requestCreatorId !== senderId) {
          await prisma.notification.create({
            data: {
              userId: requestCreatorId,
              helpdeskRequestId,
              chatId: chat.id,
              isRead: false,
            },
          });
          notifyNotificationUpdate();
        }
      }
    }
  } catch (error) {
    console.error('Failed to create notifications for chat:', error);
  }

  return chat;
}
