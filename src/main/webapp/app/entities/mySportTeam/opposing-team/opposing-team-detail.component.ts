import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';

@Component({
  selector: 'jhi-opposing-team-detail',
  templateUrl: './opposing-team-detail.component.html'
})
export class OpposingTeamDetailComponent implements OnInit {
  opposingTeam: IOpposingTeam;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ opposingTeam }) => {
      this.opposingTeam = opposingTeam;
    });
  }

  previousState() {
    window.history.back();
  }
}
