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

@Component({
  selector: 'jhi-season-update',
  templateUrl: './season-update.component.html'
})
export class SeasonUpdateComponent implements OnInit {
  isSaving: boolean;

  teams: ITeam[];
  debutDp: any;
  finDp: any;

  editForm = this.fb.group({
    id: [],
    debut: [null, [Validators.required]],
    fin: [null, [Validators.required]],
    teamIdId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected seasonService: SeasonService,
    protected teamService: TeamService,
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
  }

  updateForm(season: ISeason) {
    this.editForm.patchValue({
      id: season.id,
      debut: season.debut,
      fin: season.fin,
      teamIdId: season.teamIdId
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
      debut: this.editForm.get(['debut']).value,
      fin: this.editForm.get(['fin']).value,
      teamIdId: this.editForm.get(['teamIdId']).value
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
}
