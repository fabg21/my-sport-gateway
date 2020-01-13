import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlayers } from 'app/shared/model/MySportPlayers/players.model';

@Component({
  selector: 'jhi-players-detail',
  templateUrl: './players-detail.component.html'
})
export class PlayersDetailComponent implements OnInit {
  players: IPlayers;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ players }) => {
      this.players = players;
    });
  }

  previousState() {
    window.history.back();
  }
}
