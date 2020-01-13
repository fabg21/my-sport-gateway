import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Players } from 'app/shared/model/MySportPlayers/players.model';
import { PlayersService } from './players.service';
import { PlayersComponent } from './players.component';
import { PlayersDetailComponent } from './players-detail.component';
import { PlayersUpdateComponent } from './players-update.component';
import { IPlayers } from 'app/shared/model/MySportPlayers/players.model';

@Injectable({ providedIn: 'root' })
export class PlayersResolve implements Resolve<IPlayers> {
  constructor(private service: PlayersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlayers> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((players: HttpResponse<Players>) => players.body));
    }
    return of(new Players());
  }
}

export const playersRoute: Routes = [
  {
    path: '',
    component: PlayersComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportPlayersPlayers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlayersDetailComponent,
    resolve: {
      players: PlayersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportPlayersPlayers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlayersUpdateComponent,
    resolve: {
      players: PlayersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportPlayersPlayers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlayersUpdateComponent,
    resolve: {
      players: PlayersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySportGatewayApp.mySportPlayersPlayers.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
