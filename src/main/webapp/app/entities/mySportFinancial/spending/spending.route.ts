import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Spending } from 'app/shared/model/mySportFinancial/spending.model';
import { SpendingService } from './spending.service';
import { SpendingComponent } from './spending.component';
import { SpendingDetailComponent } from './spending-detail.component';
import { SpendingUpdateComponent } from './spending-update.component';
import { ISpending } from 'app/shared/model/mySportFinancial/spending.model';

@Injectable({ providedIn: 'root' })
export class SpendingResolve implements Resolve<ISpending> {
  constructor(private service: SpendingService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpending> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((spending: HttpResponse<Spending>) => spending.body));
    }
    return of(new Spending());
  }
}

export const spendingRoute: Routes = [
  {
    path: '',
    component: SpendingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialSpending.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SpendingDetailComponent,
    resolve: {
      spending: SpendingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialSpending.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SpendingUpdateComponent,
    resolve: {
      spending: SpendingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialSpending.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SpendingUpdateComponent,
    resolve: {
      spending: SpendingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportFinancialSpending.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
