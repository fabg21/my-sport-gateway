import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from 'app/shared/model/mySportTeam/match.model';
import { MatchService } from './match.service';
import { MatchComponent } from './match.component';
import { MatchDetailComponent } from './match-detail.component';
import { MatchUpdateComponent } from './match-update.component';
import { IMatch } from 'app/shared/model/mySportTeam/match.model';

@Injectable({ providedIn: 'root' })
export class MatchResolve implements Resolve<IMatch> {
  constructor(private service: MatchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMatch> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((match: HttpResponse<Match>) => match.body));
    }
    return of(new Match());
  }
}

export const matchRoute: Routes = [
  {
    path: '',
    component: MatchComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamMatch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MatchDetailComponent,
    resolve: {
      match: MatchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamMatch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MatchUpdateComponent,
    resolve: {
      match: MatchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamMatch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MatchUpdateComponent,
    resolve: {
      match: MatchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamMatch.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
