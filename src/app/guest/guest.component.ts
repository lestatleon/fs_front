import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Invitation, InvitationService } from '../shared';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {

  sub: Subscription;
  invitation: Invitation[];
  showMessage = false;
  invitationAvailable = false;
  approved = false;

  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService,
  ) { }

  ngOnInit() {
    this.sub = this.route.data.subscribe(
      (data: { invitation: Invitation[] }) => {
        this.invitation = data.invitation;

        if ( 1 === this.invitation['status_id'] || 2 === this.invitation['status_id']  ) {
          this.invitationAvailable = true;
          this.viewed();
          if ('' === this.invitation['message']) {
            this.showMessage = false;
          } else {
            this.showMessage = true;
          }
        } else {
          this.invitationAvailable = false;
        }
      }
    );

    
  }

  viewed() {
    this.invitationService
      .update(this.invitation['key'], { 'status': 2 })
      .subscribe(response => {
        // this.isSubmitting = false;
        // this.invitation = new Invitation();
      },
        err => {
          // this.isSubmitting = false;
        }
      );
  }

  approve() {
    this.invitationService
      .update(this.invitation['key'], {'status':3})
      .subscribe(response => {
        this.approved = true;
        // this.invitation = new Invitation();
      },
        err => {
          // this.isSubmitting = false;
        }
      );
  }

}
