import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IIncomings, Incomings } from 'app/shared/model/mySportFinancial/incomings.model';
import { IncomingsService } from './incomings.service';

@Component({
  selector: 'jhi-incomings-update',
  templateUrl: './incomings-update.component.html'
})
export class IncomingsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    label: [],
    amount: [],
    status: [],
    category: []
  });

  constructor(protected incomingsService: IncomingsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ incomings }) => {
      this.updateForm(incomings);
    });
  }

  updateForm(incomings: IIncomings) {
    this.editForm.patchValue({
      id: incomings.id,
      label: incomings.label,
      amount: incomings.amount,
      status: incomings.status,
      category: incomings.category
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const incomings = this.createFromForm();
    if (incomings.id !== undefined) {
      this.subscribeToSaveResponse(this.incomingsService.update(incomings));
    } else {
      this.subscribeToSaveResponse(this.incomingsService.create(incomings));
    }
  }

  private createFromForm(): IIncomings {
    return {
      ...new Incomings(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      amount: this.editForm.get(['amount']).value,
      status: this.editForm.get(['status']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncomings>>) {
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
