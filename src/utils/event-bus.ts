import { Subject } from 'rxjs';

export const helpdeskUpdate$ = new Subject<void>();

export function notifyHelpdeskUpdate() {
  helpdeskUpdate$.next();
}
