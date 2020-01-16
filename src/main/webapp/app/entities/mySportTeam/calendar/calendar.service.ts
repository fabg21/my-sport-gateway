import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICalendar } from 'app/shared/model/mySportTeam/calendar.model';

type EntityResponseType = HttpResponse<ICalendar>;
type EntityArrayResponseType = HttpResponse<ICalendar[]>;

@Injectable({ providedIn: 'root' })
export class CalendarService {
  public resourceUrl = SERVER_API_URL + 'services/mysportteam/api/calendars';

  constructor(protected http: HttpClient) {}

  create(calendar: ICalendar): Observable<EntityResponseType> {
    return this.http.post<ICalendar>(this.resourceUrl, calendar, { observe: 'response' });
  }

  update(calendar: ICalendar): Observable<EntityResponseType> {
    return this.http.put<ICalendar>(this.resourceUrl, calendar, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICalendar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICalendar[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}