import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISpending } from 'app/shared/model/mySportFinancial/spending.model';

type EntityResponseType = HttpResponse<ISpending>;
type EntityArrayResponseType = HttpResponse<ISpending[]>;

@Injectable({ providedIn: 'root' })
export class SpendingService {
  public resourceUrl = SERVER_API_URL + 'services/mysportfinancial/api/spendings';

  constructor(protected http: HttpClient) {}

  create(spending: ISpending): Observable<EntityResponseType> {
    return this.http.post<ISpending>(this.resourceUrl, spending, { observe: 'response' });
  }

  update(spending: ISpending): Observable<EntityResponseType> {
    return this.http.put<ISpending>(this.resourceUrl, spending, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISpending>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISpending[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
