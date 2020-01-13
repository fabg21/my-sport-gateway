import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'app/shared/model/mySportTeam/player.model';
import { PlayerService } from './player.service';
import { PlayerComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerUpdateComponent } from './player-update.component';
import { IPlayer } from 'app/shared/model/mySportTeam/player.model';

@Injectable({ providedIn: 'root' })
export class PlayerResolve implements Resolve<IPlayer> {
  constructor(private service: PlayerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlayer> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((player: HttpResponse<Player>) => player.body));
    }
    return of(new Player());
  }
}

export const playerRoute: Routes = [
  {
    path: '',
    component: PlayerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamPlayer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlayerDetailComponent,
    resolve: {
      player: PlayerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamPlayer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlayerUpdateComponent,
    resolve: {
      player: PlayerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamPlayer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlayerUpdateComponent,
    resolve: {
      player: PlayerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportTeamPlayer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
