import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUser } from 'app/shared/model/mySportUser/user.model';
import { UserService } from './user.service';

@Component({
  templateUrl: './user-delete-dialog.component.html'
})
export class UserDeleteDialogComponent {
  user: IUser;

  constructor(protected userService: UserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'userListModification',
        content: 'Deleted an user'
      });
      this.activeModal.dismiss(true);
    });
  }
}
