import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPlayer, Player } from 'app/shared/model/mySportTeam/player.model';
import { PlayerService } from './player.service';
import { ISeason } from 'app/shared/model/mySportTeam/season.model';
import { SeasonService } from 'app/entities/mySportTeam/season/season.service';

@Component({
  selector: 'jhi-player-update',
  templateUrl: './player-update.component.html'
})
export class PlayerUpdateComponent implements OnInit {
  isSaving: boolean;

  seasons: ISeason[];
  dateOfBirthDp: any;

  editForm = this.fb.group({
    id: [],
    firstname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    email: [],
    address: [],
    phone: [],
    avatar: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected playerService: PlayerService,
    protected seasonService: SeasonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ player }) => {
      this.updateForm(player);
    });
    this.seasonService
      .query()
      .subscribe((res: HttpResponse<ISeason[]>) => (this.seasons = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(player: IPlayer) {
    this.editForm.patchValue({
      id: player.id,
      firstname: player.firstname,
      lastname: player.lastname,
      dateOfBirth: player.dateOfBirth,
      email: player.email,
      address: player.address,
      phone: player.phone,
      avatar: player.avatar
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const player = this.createFromForm();
    if (player.id !== undefined) {
      this.subscribeToSaveResponse(this.playerService.update(player));
    } else {
      this.subscribeToSaveResponse(this.playerService.create(player));
    }
  }

  private createFromForm(): IPlayer {
    return {
      ...new Player(),
      id: this.editForm.get(['id']).value,
      firstname: this.editForm.get(['firstname']).value,
      lastname: this.editForm.get(['lastname']).value,
      dateOfBirth: this.editForm.get(['dateOfBirth']).value,
      email: this.editForm.get(['email']).value,
      address: this.editForm.get(['address']).value,
      phone: this.editForm.get(['phone']).value,
      avatar: this.editForm.get(['avatar']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayer>>) {
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

  trackSeasonById(index: number, item: ISeason) {
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
