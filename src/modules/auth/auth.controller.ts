import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Throttled per IP + Username (default 30 attempts per 60 seconds per account)
  @Throttle({
    default: {
      limit: Number(process.env.THROTTLE_LOGIN_LIMIT) || 30,
      ttl: Number(process.env.THROTTLE_LOGIN_TTL) || 60000,
    },
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: UserRequest) {
    return req.user;
  }
}
