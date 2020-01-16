import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calendar } from 'app/shared/model/mySportTeam/calendar.model';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';
import { CalendarDetailComponent } from './calendar-detail.component';
import { CalendarUpdateComponent } from './calendar-update.component';
import { ICalendar } from 'app/shared/model/mySportTeam/calendar.model';

@Injectable({ providedIn: 'root' })
export class CalendarResolve implements Resolve<ICalendar> {
  constructor(private service: CalendarService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICalendar> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((calendar: HttpResponse<Calendar>) => calendar.body));
    }
    return of(new Calendar());
  }
}

export const calendarRoute: Routes = [
  {
    path: '',
    component: CalendarComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamCalendar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CalendarDetailComponent,
    resolve: {
      calendar: CalendarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamCalendar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CalendarUpdateComponent,
    resolve: {
      calendar: CalendarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamCalendar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CalendarUpdateComponent,
    resolve: {
      calendar: CalendarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamCalendar.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
