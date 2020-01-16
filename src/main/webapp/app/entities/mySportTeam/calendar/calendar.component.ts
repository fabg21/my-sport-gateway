import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICalendar } from 'app/shared/model/mySportTeam/calendar.model';
import { CalendarService } from './calendar.service';
import { CalendarDeleteDialogComponent } from './calendar-delete-dialog.component';

@Component({
  selector: 'jhi-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendars: ICalendar[];
  eventSubscriber: Subscription;

  constructor(protected calendarService: CalendarService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.calendarService.query().subscribe((res: HttpResponse<ICalendar[]>) => {
      this.calendars = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCalendars();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICalendar) {
    return item.id;
  }

  registerChangeInCalendars() {
    this.eventSubscriber = this.eventManager.subscribe('calendarListModification', () => this.loadAll());
  }

  delete(calendar: ICalendar) {
    const modalRef = this.modalService.open(CalendarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.calendar = calendar;
  }
}
