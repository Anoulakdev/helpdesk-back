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
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @Roles(2)
  create(@Req() req: UserRequest, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(req.user, createTicketDto);
  }

  @Get()
  @Roles(2)
  findAll(@Req() req: UserRequest) {
    return this.ticketService.findAll(req.user);
  }

  @Get('selectticket')
  selectTicket(@Query('categoryId') categoryId?: number) {
    return this.ticketService.selectTicket(categoryId);
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(+id, req.user, updateTicketDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
