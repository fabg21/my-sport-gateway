import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMatch } from 'app/shared/model/mySportTeam/match.model';

type EntityResponseType = HttpResponse<IMatch>;
type EntityArrayResponseType = HttpResponse<IMatch[]>;

@Injectable({ providedIn: 'root' })
export class MatchService {
  public resourceUrl = SERVER_API_URL + 'services/mysportteam/api/matches';

  constructor(protected http: HttpClient) {}

  create(match: IMatch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(match);
    return this.http
      .post<IMatch>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(match: IMatch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(match);
    return this.http
      .put<IMatch>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMatch>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMatch[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(match: IMatch): IMatch {
    const copy: IMatch = Object.assign({}, match, {
      date: match.date != null && match.date.isValid() ? match.date.format(DATE_FORMAT) : null,
      appointmentHour: match.appointmentHour != null && match.appointmentHour.isValid() ? match.appointmentHour.toJSON() : null,
      startTime: match.startTime != null && match.startTime.isValid() ? match.startTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
      res.body.appointmentHour = res.body.appointmentHour != null ? moment(res.body.appointmentHour) : null;
      res.body.startTime = res.body.startTime != null ? moment(res.body.startTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((match: IMatch) => {
        match.date = match.date != null ? moment(match.date) : null;
        match.appointmentHour = match.appointmentHour != null ? moment(match.appointmentHour) : null;
        match.startTime = match.startTime != null ? moment(match.startTime) : null;
      });
    }
    return res;
  }
}
