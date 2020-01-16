import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';
import { OpposingTeamService } from './opposing-team.service';
import { OpposingTeamComponent } from './opposing-team.component';
import { OpposingTeamDetailComponent } from './opposing-team-detail.component';
import { OpposingTeamUpdateComponent } from './opposing-team-update.component';
import { IOpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';

@Injectable({ providedIn: 'root' })
export class OpposingTeamResolve implements Resolve<IOpposingTeam> {
  constructor(private service: OpposingTeamService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOpposingTeam> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((opposingTeam: HttpResponse<OpposingTeam>) => opposingTeam.body));
    }
    return of(new OpposingTeam());
  }
}

export const opposingTeamRoute: Routes = [
  {
    path: '',
    component: OpposingTeamComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamOpposingTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OpposingTeamDetailComponent,
    resolve: {
      opposingTeam: OpposingTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamOpposingTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OpposingTeamUpdateComponent,
    resolve: {
      opposingTeam: OpposingTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamOpposingTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OpposingTeamUpdateComponent,
    resolve: {
      opposingTeam: OpposingTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamOpposingTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
