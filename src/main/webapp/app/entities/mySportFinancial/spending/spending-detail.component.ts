import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpending } from 'app/shared/model/mySportFinancial/spending.model';

@Component({
  selector: 'jhi-spending-detail',
  templateUrl: './spending-detail.component.html'
})
export class SpendingDetailComponent implements OnInit {
  spending: ISpending;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ spending }) => {
      this.spending = spending;
    });
  }

  previousState() {
    window.history.back();
  }
}
