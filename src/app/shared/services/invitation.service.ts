import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Invitation } from '../models';

@Injectable()
export class InvitationService {

  constructor(
    private apiService: ApiService
  ) { }

  public getList(): Observable<Invitation[]> {
    return this.apiService.get('/invitation')
      .map(response => response);
  }

  public getInvitation(id: string): Observable<Invitation[]> {
    return this.apiService.get('/invitation/' + id)
      .map(response => response);
  }

  public createInvitation(invitation): Observable<Invitation[]> {
    return this.apiService.post('/invitation', invitation)
      .map(response => response);
  }

  public update(key: string, invitation): Observable<Invitation[]> {
    return this.apiService.put('/invitation/' + key, invitation)
  }
}
