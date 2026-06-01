import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { CreateHelpdeskrequestDto } from './dto/create-helpdeskrequest.dto';
import { UpdateHelpdeskrequestDto } from './dto/update-helpdeskrequest.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createHDRequest } from './services/create';
import { adminFindAll } from './services/adminfindall';
import { userFindAll } from './services/userfindall';
import { findOneHDRequest } from './services/findone';
import { updateHDRequest } from './services/update';
import { removeHDRequest } from './services/remove';
import { updateHelpdeskStatus } from './services/updateHelpdeskStatus';
import { updatePriority } from './services/updatePriority';
import { sktHistory } from './services/history';
import { helpdeskUpdate$, notifyHelpdeskUpdate } from '../../utils/event-bus';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Injectable()
export class HelpdeskrequestService implements OnModuleDestroy {
  private readonly queryCache = new Map<string, Promise<any>>();
  private readonly eventSubscription: Subscription;
  readonly change$ = helpdeskUpdate$;

  constructor(private prisma: PrismaService) {
    // ล้าง Cache เมื่อมีการประกาศอัปเดตข้อมูล Helpdesk
    this.eventSubscription = this.change$.subscribe(() => {
      this.queryCache.clear();
    });
  }

  onModuleDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  async create(
    user: AuthUser,
    createHelpdeskrequestDto: CreateHelpdeskrequestDto,
    hdFileName?: string,
    hdImgNames?: string[],
  ) {
    const result = await createHDRequest(
      this.prisma,
      user,
      createHelpdeskrequestDto,
      hdFileName,
      hdImgNames,
    );
    notifyHelpdeskUpdate();
    return result;
  }

  async adminFindAll(user: AuthUser, helpdeskStatusId?: number) {
    const cacheKey = `${user.employee.divisionId}-${helpdeskStatusId ?? 'all'}`;

    let queryPromise = this.queryCache.get(cacheKey);
    if (!queryPromise) {
      queryPromise = adminFindAll(this.prisma, user, helpdeskStatusId);
      this.queryCache.set(cacheKey, queryPromise);

      // ถ้าดึงข้อมูลล้มเหลว ให้ลบตัวที่พังออกจาก Cache เพื่อให้ดึงใหม่ได้ในอนาคต
      queryPromise.catch(() => {
        this.queryCache.delete(cacheKey);
      });
    }

    return queryPromise;
  }

  getAdminStream(user: AuthUser, helpdeskStatusId?: number): Observable<any> {
    return this.change$.pipe(
      debounceTime(100),
      startWith(null), // ส่งข้อมูลรอบแรกทันทีเมื่อเริ่มเชื่อมต่อ
      switchMap(() => this.adminFindAll(user, helpdeskStatusId)),
    );
  }

  userFindAll(user: AuthUser, helpdeskStatusId?: number) {
    return userFindAll(this.prisma, user, helpdeskStatusId);
  }

  sktHistory(numberSKT: string, createdAt: string) {
    return sktHistory(this.prisma, numberSKT, createdAt);
  }

  findOne(id: number) {
    return findOneHDRequest(this.prisma, id);
  }

  async update(id: number, updateHelpdeskrequestDto: UpdateHelpdeskrequestDto) {
    const result = await updateHDRequest(this.prisma, id, updateHelpdeskrequestDto);
    notifyHelpdeskUpdate();
    return result;
  }

  async updateHelpdeskStatus(
    id: number,
    updateHelpdeskrequestDto: UpdateHelpdeskrequestDto,
  ) {
    const result = await updateHelpdeskStatus(
      this.prisma,
      id,
      updateHelpdeskrequestDto,
    );
    notifyHelpdeskUpdate();
    return result;
  }

  async updatePriority(
    id: number,
    updateHelpdeskrequestDto: UpdateHelpdeskrequestDto,
  ) {
    const result = await updatePriority(
      this.prisma,
      id,
      updateHelpdeskrequestDto,
    );
    notifyHelpdeskUpdate();
    return result;
  }

  async remove(id: number) {
    const result = await removeHDRequest(this.prisma, id);
    notifyHelpdeskUpdate();
    return result;
  }
}
