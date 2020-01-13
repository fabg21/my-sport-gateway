import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncomings } from 'app/shared/model/mySportFinancial/incomings.model';

@Component({
  selector: 'jhi-incomings-detail',
  templateUrl: './incomings-detail.component.html'
})
export class IncomingsDetailComponent implements OnInit {
  incomings: IIncomings;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ incomings }) => {
      this.incomings = incomings;
    });
  }

  previousState() {
    window.history.back();
  }
}
