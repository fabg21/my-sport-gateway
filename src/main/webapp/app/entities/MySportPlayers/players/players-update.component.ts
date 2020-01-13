import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IPlayers, Players } from 'app/shared/model/MySportPlayers/players.model';
import { PlayersService } from './players.service';

@Component({
  selector: 'jhi-players-update',
  templateUrl: './players-update.component.html'
})
export class PlayersUpdateComponent implements OnInit {
  isSaving: boolean;
  dateOfBirthDp: any;

  editForm = this.fb.group({
    id: [],
    firstname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    dateOfBirth: [],
    email: [],
    address: [],
    phone: [],
    avatar: []
  });

  constructor(protected playersService: PlayersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ players }) => {
      this.updateForm(players);
    });
  }

  updateForm(players: IPlayers) {
    this.editForm.patchValue({
      id: players.id,
      firstname: players.firstname,
      lastname: players.lastname,
      dateOfBirth: players.dateOfBirth,
      email: players.email,
      address: players.address,
      phone: players.phone,
      avatar: players.avatar
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const players = this.createFromForm();
    if (players.id !== undefined) {
      this.subscribeToSaveResponse(this.playersService.update(players));
    } else {
      this.subscribeToSaveResponse(this.playersService.create(players));
    }
  }

  private createFromForm(): IPlayers {
    return {
      ...new Players(),
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayers>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
