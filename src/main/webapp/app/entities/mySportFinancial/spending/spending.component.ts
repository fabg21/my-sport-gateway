import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpending } from 'app/shared/model/mySportFinancial/spending.model';
import { SpendingService } from './spending.service';
import { SpendingDeleteDialogComponent } from './spending-delete-dialog.component';

@Component({
  selector: 'jhi-spending',
  templateUrl: './spending.component.html'
})
export class SpendingComponent implements OnInit, OnDestroy {
  spendings: ISpending[];
  eventSubscriber: Subscription;

  constructor(protected spendingService: SpendingService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.spendingService.query().subscribe((res: HttpResponse<ISpending[]>) => {
      this.spendings = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSpendings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISpending) {
    return item.id;
  }

  registerChangeInSpendings() {
    this.eventSubscriber = this.eventManager.subscribe('spendingListModification', () => this.loadAll());
  }

  delete(spending: ISpending) {
    const modalRef = this.modalService.open(SpendingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.spending = spending;
  }
}
