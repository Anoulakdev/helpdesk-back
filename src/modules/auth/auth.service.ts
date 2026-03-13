/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

type User = {
  id: number;
  username: string;
  password: string;
  status: string;
  employeeId: number;
  roleId: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
    emp_code: string;
    status: string;
    gender: string | null;
    tel: string | null;
    email: string | null;
    empimg: string | null;
    posId: number | null;
    departmentId: number | null;
    divisionId: number | null;
    officeId: number | null;
    unitId: number | null;
    division: {
      id: number;
      branch_id: number | null;
    } | null;
  };
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        status: true,
        employeeId: true,
        roleId: true,
        employee: {
          include: {
            division: {
              select: {
                id: true,
                branch_id: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Username Not Found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password Not Match');
    }

    if (user.status !== 'A') {
      throw new ForbiddenException('User Is Disable');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      employeeId: user.employeeId,
      roleId: user.roleId,
      departmentId: user.employee.departmentId,
      divisionId: user.employee.divisionId,
      officeId: user.employee.officeId,
      unitId: user.employee.unitId,
      // branch_id: user.employee.division?.branch_id,
    };

    const expiresIn = '10h';

    return {
      token: this.jwtService.sign(payload, { expiresIn }),
      user,
    };
  }
}
