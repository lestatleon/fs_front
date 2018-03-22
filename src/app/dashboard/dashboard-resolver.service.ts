import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Invitation, InvitationService } from '../shared';

@Injectable()
export class DashboardResolver implements Resolve<Invitation> {
  constructor(
    private router: Router,
    private invitationService: InvitationService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.invitationService.getList()
      .catch(err => {
        return Observable.of([]);
      });
  }
}
