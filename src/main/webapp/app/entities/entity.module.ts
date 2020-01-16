import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user',
        loadChildren: () => import('./mySportUser/user/user.module').then(m => m.MySportUserUserModule)
      },
      {
        path: 'spending',
        loadChildren: () => import('./mySportFinancial/spending/spending.module').then(m => m.MySportFinancialSpendingModule)
      },
      {
        path: 'incomings',
        loadChildren: () => import('./mySportFinancial/incomings/incomings.module').then(m => m.MySportFinancialIncomingsModule)
      },
      {
        path: 'players',
        loadChildren: () => import('./MySportPlayers/players/players.module').then(m => m.MySportPlayersPlayersModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./mySportTeam/team/team.module').then(m => m.MySportTeamTeamModule)
      },
      {
        path: 'season',
        loadChildren: () => import('./mySportTeam/season/season.module').then(m => m.MySportTeamSeasonModule)
      },
      {
        path: 'player',
        loadChildren: () => import('./mySportTeam/player/player.module').then(m => m.MySportTeamPlayerModule)
      },
      {
        path: 'opposing-team',
        loadChildren: () => import('./mySportTeam/opposing-team/opposing-team.module').then(m => m.MySportTeamOpposingTeamModule)
      },
      {
        path: 'match',
        loadChildren: () => import('./mySportTeam/match/match.module').then(m => m.MySportTeamMatchModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./mySportTeam/calendar/calendar.module').then(m => m.MySportTeamCalendarModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MySportGatewayEntityModule {}
