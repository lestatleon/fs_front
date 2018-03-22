import { Component, OnInit } from '@angular/core';
import { Invitation, InvitationService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  listInvitations;
  invitation = new Invitation();
  sub: Subscription;
  isSubmitting = false;
  constructor(
    private invitationService: InvitationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.data.subscribe(
      (data: { invitations: {} }) => {
        this.listInvitations = data.invitations;
      }
    );
  }

  save() {
    this.isSubmitting = true;

    this.invitationService
      .createInvitation(this.invitation)
      .subscribe(response => {
        this.isSubmitting = false;
        this.invitation = new Invitation();
      },
        err => {
          this.isSubmitting = false;
        }
      );
  }
}
