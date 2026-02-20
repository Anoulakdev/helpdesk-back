import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @Roles(2, 3, 4)
  create(@Req() req: UserRequest, @Body() createChatDto: CreateChatDto) {
    return this.chatService.create(req.user, createChatDto);
  }

  @Get()
  @Roles(2, 3, 4)
  findAll(@Query('helpdeskRequestId') helpdeskRequestId: number) {
    return this.chatService.findAll(helpdeskRequestId);
  }

  @Get(':id')
  @Roles(2, 3, 4)
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Put(':id')
  @Roles(2, 3, 4)
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  @Roles(2, 3, 4)
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
