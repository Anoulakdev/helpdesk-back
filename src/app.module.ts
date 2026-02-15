import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
