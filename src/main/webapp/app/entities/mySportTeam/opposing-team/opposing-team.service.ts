import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';

type EntityResponseType = HttpResponse<IOpposingTeam>;
type EntityArrayResponseType = HttpResponse<IOpposingTeam[]>;

@Injectable({ providedIn: 'root' })
export class OpposingTeamService {
  public resourceUrl = SERVER_API_URL + 'services/mysportteam/api/opposing-teams';

  constructor(protected http: HttpClient) {}

  create(opposingTeam: IOpposingTeam): Observable<EntityResponseType> {
    return this.http.post<IOpposingTeam>(this.resourceUrl, opposingTeam, { observe: 'response' });
  }

  update(opposingTeam: IOpposingTeam): Observable<EntityResponseType> {
    return this.http.put<IOpposingTeam>(this.resourceUrl, opposingTeam, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOpposingTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOpposingTeam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
