import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOpposingTeam, OpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';
import { OpposingTeamService } from './opposing-team.service';

@Component({
  selector: 'jhi-opposing-team-update',
  templateUrl: './opposing-team-update.component.html'
})
export class OpposingTeamUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(protected opposingTeamService: OpposingTeamService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ opposingTeam }) => {
      this.updateForm(opposingTeam);
    });
  }

  updateForm(opposingTeam: IOpposingTeam) {
    this.editForm.patchValue({
      id: opposingTeam.id,
      name: opposingTeam.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const opposingTeam = this.createFromForm();
    if (opposingTeam.id !== undefined) {
      this.subscribeToSaveResponse(this.opposingTeamService.update(opposingTeam));
    } else {
      this.subscribeToSaveResponse(this.opposingTeamService.create(opposingTeam));
    }
  }

  private createFromForm(): IOpposingTeam {
    return {
      ...new OpposingTeam(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOpposingTeam>>) {
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
