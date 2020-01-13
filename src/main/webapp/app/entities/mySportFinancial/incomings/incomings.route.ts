import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incomings } from 'app/shared/model/mySportFinancial/incomings.model';
import { IncomingsService } from './incomings.service';
import { IncomingsComponent } from './incomings.component';
import { IncomingsDetailComponent } from './incomings-detail.component';
import { IncomingsUpdateComponent } from './incomings-update.component';
import { IIncomings } from 'app/shared/model/mySportFinancial/incomings.model';

@Injectable({ providedIn: 'root' })
export class IncomingsResolve implements Resolve<IIncomings> {
  constructor(private service: IncomingsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIncomings> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((incomings: HttpResponse<Incomings>) => incomings.body));
    }
    return of(new Incomings());
  }
}

export const incomingsRoute: Routes = [
  {
    path: '',
    component: IncomingsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialIncomings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IncomingsDetailComponent,
    resolve: {
      incomings: IncomingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialIncomings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IncomingsUpdateComponent,
    resolve: {
      incomings: IncomingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialIncomings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IncomingsUpdateComponent,
    resolve: {
      incomings: IncomingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialIncomings.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
