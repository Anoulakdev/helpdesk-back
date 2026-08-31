import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guards/custom-throttler.guard';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { DepartmentModule } from './modules/department/department.module';
import { DivisionModule } from './modules/division/division.module';
import { OfficeModule } from './modules/office/office.module';
import { UnitModule } from './modules/unit/unit.module';
import { PositiongroupModule } from './modules/positiongroup/positiongroup.module';
import { PositioncodeModule } from './modules/positioncode/positioncode.module';
import { PositionModule } from './modules/position/position.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { BuildingModule } from './modules/building/building.module';
import { FloorModule } from './modules/floor/floor.module';
import { TurningModule } from './modules/turning/turning.module';
import { HelpdeskstatusModule } from './modules/helpdeskstatus/helpdeskstatus.module';
import { PriorityModule } from './modules/priority/priority.module';
import { HeadcategoryModule } from './modules/headcategory/headcategory.module';
import { CategoryModule } from './modules/category/category.module';
import { CategoryiconModule } from './modules/categoryicon/categoryicon.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { HelpdeskrequestModule } from './modules/helpdeskrequest/helpdeskrequest.module';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { ChatModule } from './modules/chat/chat.module';
import { ReportModule } from './modules/report/report.module';
import { TypedeviceModule } from './modules/typedevice/typedevice.module';
import { BrandModule } from './modules/brand/brand.module';
import { EliminateModule } from './modules/eliminate/eliminate.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          name: 'default',
          ttl: Number(config.get('THROTTLE_TTL')) || 60000, // 60 seconds
          limit: Number(config.get('THROTTLE_LIMIT')) || 300, // 300 requests per minute per user/IP
        },
      ],
    }),
    AuthModule,
    DepartmentModule,
    DivisionModule,
    OfficeModule,
    UnitModule,
    PositiongroupModule,
    PositioncodeModule,
    PositionModule,
    EmployeeModule,
    UserModule,
    RoleModule,
    BuildingModule,
    FloorModule,
    TurningModule,
    HelpdeskstatusModule,
    PriorityModule,
    HeadcategoryModule,
    CategoryModule,
    CategoryiconModule,
    TicketModule,
    HelpdeskrequestModule,
    AssignmentModule,
    ChatModule,
    ReportModule,
    TypedeviceModule,
    BrandModule,
    EliminateModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
