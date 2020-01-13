import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISeason } from 'app/shared/model/mySportTeam/season.model';

type EntityResponseType = HttpResponse<ISeason>;
type EntityArrayResponseType = HttpResponse<ISeason[]>;

@Injectable({ providedIn: 'root' })
export class SeasonService {
  public resourceUrl = SERVER_API_URL + 'services/mysportteam/api/seasons';

  constructor(protected http: HttpClient) {}

  create(season: ISeason): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(season);
    return this.http
      .post<ISeason>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(season: ISeason): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(season);
    return this.http
      .put<ISeason>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISeason>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeason[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(season: ISeason): ISeason {
    const copy: ISeason = Object.assign({}, season, {
      start: season.start != null && season.start.isValid() ? season.start.format(DATE_FORMAT) : null,
      end: season.end != null && season.end.isValid() ? season.end.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.start = res.body.start != null ? moment(res.body.start) : null;
      res.body.end = res.body.end != null ? moment(res.body.end) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((season: ISeason) => {
        season.start = season.start != null ? moment(season.start) : null;
        season.end = season.end != null ? moment(season.end) : null;
      });
    }
    return res;
  }
}
