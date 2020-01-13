import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIncomings } from 'app/shared/model/mySportFinancial/incomings.model';
import { IncomingsService } from './incomings.service';
import { IncomingsDeleteDialogComponent } from './incomings-delete-dialog.component';

@Component({
  selector: 'jhi-incomings',
  templateUrl: './incomings.component.html'
})
export class IncomingsComponent implements OnInit, OnDestroy {
  incomings: IIncomings[];
  eventSubscriber: Subscription;

  constructor(protected incomingsService: IncomingsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.incomingsService.query().subscribe((res: HttpResponse<IIncomings[]>) => {
      this.incomings = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInIncomings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIncomings) {
    return item.id;
  }

  registerChangeInIncomings() {
    this.eventSubscriber = this.eventManager.subscribe('incomingsListModification', () => this.loadAll());
  }

  delete(incomings: IIncomings) {
    const modalRef = this.modalService.open(IncomingsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.incomings = incomings;
  }
}
