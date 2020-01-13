import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySportGatewaySharedModule } from 'app/shared/shared.module';
import { SeasonComponent } from './season.component';
import { SeasonDetailComponent } from './season-detail.component';
import { SeasonUpdateComponent } from './season-update.component';
import { SeasonDeleteDialogComponent } from './season-delete-dialog.component';
import { seasonRoute } from './season.route';

@NgModule({
  imports: [MySportGatewaySharedModule, RouterModule.forChild(seasonRoute)],
  declarations: [SeasonComponent, SeasonDetailComponent, SeasonUpdateComponent, SeasonDeleteDialogComponent],
  entryComponents: [SeasonDeleteDialogComponent]
})
export class MySportTeamSeasonModule {}
