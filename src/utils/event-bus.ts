import { Subject } from 'rxjs';

export const helpdeskUpdate$ = new Subject<void>();

export function notifyHelpdeskUpdate() {
  helpdeskUpdate$.next();
}

export const notificationUpdate$ = new Subject<void>();

export function notifyNotificationUpdate() {
  notificationUpdate$.next();
}
