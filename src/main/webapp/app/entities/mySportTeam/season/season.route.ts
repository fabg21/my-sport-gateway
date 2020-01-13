import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Season } from 'app/shared/model/mySportTeam/season.model';
import { SeasonService } from './season.service';
import { SeasonComponent } from './season.component';
import { SeasonDetailComponent } from './season-detail.component';
import { SeasonUpdateComponent } from './season-update.component';
import { ISeason } from 'app/shared/model/mySportTeam/season.model';

@Injectable({ providedIn: 'root' })
export class SeasonResolve implements Resolve<ISeason> {
  constructor(private service: SeasonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeason> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((season: HttpResponse<Season>) => season.body));
    }
    return of(new Season());
  }
}

export const seasonRoute: Routes = [
  {
    path: '',
    component: SeasonComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamSeason.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SeasonDetailComponent,
    resolve: {
      season: SeasonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamSeason.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SeasonUpdateComponent,
    resolve: {
      season: SeasonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamSeason.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SeasonUpdateComponent,
    resolve: {
      season: SeasonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamSeason.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
