import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlayers } from 'app/shared/model/MySportPlayers/players.model';

type EntityResponseType = HttpResponse<IPlayers>;
type EntityArrayResponseType = HttpResponse<IPlayers[]>;

@Injectable({ providedIn: 'root' })
export class PlayersService {
  public resourceUrl = SERVER_API_URL + 'services/mysportplayers/api/players';

  constructor(protected http: HttpClient) {}

  create(players: IPlayers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(players);
    return this.http
      .post<IPlayers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(players: IPlayers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(players);
    return this.http
      .put<IPlayers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlayers>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlayers[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(players: IPlayers): IPlayers {
    const copy: IPlayers = Object.assign({}, players, {
      dateOfBirth: players.dateOfBirth != null && players.dateOfBirth.isValid() ? players.dateOfBirth.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfBirth = res.body.dateOfBirth != null ? moment(res.body.dateOfBirth) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((players: IPlayers) => {
        players.dateOfBirth = players.dateOfBirth != null ? moment(players.dateOfBirth) : null;
      });
    }
    return res;
  }
}
