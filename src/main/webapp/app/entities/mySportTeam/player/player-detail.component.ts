import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlayer } from 'app/shared/model/mySportTeam/player.model';

@Component({
  selector: 'jhi-player-detail',
  templateUrl: './player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
  player: IPlayer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ player }) => {
      this.player = player;
    });
  }

  previousState() {
    window.history.back();
  }
}
