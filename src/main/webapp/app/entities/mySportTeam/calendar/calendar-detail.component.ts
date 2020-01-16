import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICalendar } from 'app/shared/model/mySportTeam/calendar.model';

@Component({
  selector: 'jhi-calendar-detail',
  templateUrl: './calendar-detail.component.html'
})
export class CalendarDetailComponent implements OnInit {
  calendar: ICalendar;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ calendar }) => {
      this.calendar = calendar;
    });
  }

  previousState() {
    window.history.back();
  }
}
