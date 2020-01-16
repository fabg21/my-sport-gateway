import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICalendar } from 'app/shared/model/mySportTeam/calendar.model';
import { CalendarService } from './calendar.service';

@Component({
  templateUrl: './calendar-delete-dialog.component.html'
})
export class CalendarDeleteDialogComponent {
  calendar: ICalendar;

  constructor(protected calendarService: CalendarService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.calendarService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'calendarListModification',
        content: 'Deleted an calendar'
      });
      this.activeModal.dismiss(true);
    });
  }
}
