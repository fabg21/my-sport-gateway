import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySportGatewaySharedModule } from 'app/shared/shared.module';
import { SpendingComponent } from './spending.component';
import { SpendingDetailComponent } from './spending-detail.component';
import { SpendingUpdateComponent } from './spending-update.component';
import { SpendingDeleteDialogComponent } from './spending-delete-dialog.component';
import { spendingRoute } from './spending.route';

@NgModule({
  imports: [MySportGatewaySharedModule, RouterModule.forChild(spendingRoute)],
  declarations: [SpendingComponent, SpendingDetailComponent, SpendingUpdateComponent, SpendingDeleteDialogComponent],
  entryComponents: [SpendingDeleteDialogComponent]
})
export class MySportFinancialSpendingModule {}
