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
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UserRequest } from '../../interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Req() req: UserRequest, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(req.user, createTicketDto);
  }

  @Get()
  findAll(@Req() req: UserRequest) {
    return this.ticketService.findAll(req.user);
  }

  @Get('selectticket')
  selectTicket(@Query('categoryId') categoryId?: number) {
    return this.ticketService.selectTicket(categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(+id, req.user, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
