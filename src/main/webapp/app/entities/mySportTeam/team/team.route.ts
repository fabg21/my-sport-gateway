import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'app/shared/model/mySportTeam/team.model';
import { TeamService } from './team.service';
import { TeamComponent } from './team.component';
import { TeamDetailComponent } from './team-detail.component';
import { TeamUpdateComponent } from './team-update.component';
import { ITeam } from 'app/shared/model/mySportTeam/team.model';

@Injectable({ providedIn: 'root' })
export class TeamResolve implements Resolve<ITeam> {
  constructor(private service: TeamService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITeam> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((team: HttpResponse<Team>) => team.body));
    }
    return of(new Team());
  }
}

export const teamRoute: Routes = [
  {
    path: '',
    component: TeamComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TeamDetailComponent,
    resolve: {
      team: TeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TeamUpdateComponent,
    resolve: {
      team: TeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TeamUpdateComponent,
    resolve: {
      team: TeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
