import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISeason, Season } from 'app/shared/model/mySportTeam/season.model';
import { SeasonService } from './season.service';
import { ITeam } from 'app/shared/model/mySportTeam/team.model';
import { TeamService } from 'app/entities/mySportTeam/team/team.service';
import { IPlayer } from 'app/shared/model/mySportTeam/player.model';
import { PlayerService } from 'app/entities/mySportTeam/player/player.service';

@Component({
  selector: 'jhi-season-update',
  templateUrl: './season-update.component.html'
})
export class SeasonUpdateComponent implements OnInit {
  isSaving: boolean;

  teams: ITeam[];

  players: IPlayer[];
  startDp: any;
  endDp: any;

  editForm = this.fb.group({
    id: [],
    start: [],
    end: [],
    teamIdId: [],
    players: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected seasonService: SeasonService,
    protected teamService: TeamService,
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ season }) => {
      this.updateForm(season);
    });
    this.teamService
      .query()
      .subscribe((res: HttpResponse<ITeam[]>) => (this.teams = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.playerService
      .query()
      .subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(season: ISeason) {
    this.editForm.patchValue({
      id: season.id,
      start: season.start,
      end: season.end,
      teamIdId: season.teamIdId,
      players: season.players
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const season = this.createFromForm();
    if (season.id !== undefined) {
      this.subscribeToSaveResponse(this.seasonService.update(season));
    } else {
      this.subscribeToSaveResponse(this.seasonService.create(season));
    }
  }

  private createFromForm(): ISeason {
    return {
      ...new Season(),
      id: this.editForm.get(['id']).value,
      start: this.editForm.get(['start']).value,
      end: this.editForm.get(['end']).value,
      teamIdId: this.editForm.get(['teamIdId']).value,
      players: this.editForm.get(['players']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeason>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTeamById(index: number, item: ITeam) {
    return item.id;
  }

  trackPlayerById(index: number, item: IPlayer) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
