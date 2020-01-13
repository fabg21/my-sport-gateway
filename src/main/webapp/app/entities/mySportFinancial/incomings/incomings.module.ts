import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySportGatewaySharedModule } from 'app/shared/shared.module';
import { IncomingsComponent } from './incomings.component';
import { IncomingsDetailComponent } from './incomings-detail.component';
import { IncomingsUpdateComponent } from './incomings-update.component';
import { IncomingsDeleteDialogComponent } from './incomings-delete-dialog.component';
import { incomingsRoute } from './incomings.route';

@NgModule({
  imports: [MySportGatewaySharedModule, RouterModule.forChild(incomingsRoute)],
  declarations: [IncomingsComponent, IncomingsDetailComponent, IncomingsUpdateComponent, IncomingsDeleteDialogComponent],
  entryComponents: [IncomingsDeleteDialogComponent]
})
export class MySportFinancialIncomingsModule {}
