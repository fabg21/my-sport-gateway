import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IIncomings } from 'app/shared/model/mySportFinancial/incomings.model';

type EntityResponseType = HttpResponse<IIncomings>;
type EntityArrayResponseType = HttpResponse<IIncomings[]>;

@Injectable({ providedIn: 'root' })
export class IncomingsService {
  public resourceUrl = SERVER_API_URL + 'services/mysportfinancial/api/incomings';

  constructor(protected http: HttpClient) {}

  create(incomings: IIncomings): Observable<EntityResponseType> {
    return this.http.post<IIncomings>(this.resourceUrl, incomings, { observe: 'response' });
  }

  update(incomings: IIncomings): Observable<EntityResponseType> {
    return this.http.put<IIncomings>(this.resourceUrl, incomings, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIncomings>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIncomings[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
