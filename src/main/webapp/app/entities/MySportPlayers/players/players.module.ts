import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySportGatewaySharedModule } from 'app/shared/shared.module';
import { PlayersComponent } from './players.component';
import { PlayersDetailComponent } from './players-detail.component';
import { PlayersUpdateComponent } from './players-update.component';
import { PlayersDeleteDialogComponent } from './players-delete-dialog.component';
import { playersRoute } from './players.route';

@NgModule({
  imports: [MySportGatewaySharedModule, RouterModule.forChild(playersRoute)],
  declarations: [PlayersComponent, PlayersDetailComponent, PlayersUpdateComponent, PlayersDeleteDialogComponent],
  entryComponents: [PlayersDeleteDialogComponent]
})
export class MySportPlayersPlayersModule {}
