import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySportGatewaySharedModule } from 'app/shared/shared.module';
import { OpposingTeamComponent } from './opposing-team.component';
import { OpposingTeamDetailComponent } from './opposing-team-detail.component';
import { OpposingTeamUpdateComponent } from './opposing-team-update.component';
import { OpposingTeamDeleteDialogComponent } from './opposing-team-delete-dialog.component';
import { opposingTeamRoute } from './opposing-team.route';

@NgModule({
  imports: [MySportGatewaySharedModule, RouterModule.forChild(opposingTeamRoute)],
  declarations: [OpposingTeamComponent, OpposingTeamDetailComponent, OpposingTeamUpdateComponent, OpposingTeamDeleteDialogComponent],
  entryComponents: [OpposingTeamDeleteDialogComponent]
})
export class MySportTeamOpposingTeamModule {}
