import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISpending, Spending } from 'app/shared/model/mySportFinancial/spending.model';
import { SpendingService } from './spending.service';

@Component({
  selector: 'jhi-spending-update',
  templateUrl: './spending-update.component.html'
})
export class SpendingUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    label: [],
    amount: [],
    status: []
  });

  constructor(protected spendingService: SpendingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ spending }) => {
      this.updateForm(spending);
    });
  }

  updateForm(spending: ISpending) {
    this.editForm.patchValue({
      id: spending.id,
      label: spending.label,
      amount: spending.amount,
      status: spending.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const spending = this.createFromForm();
    if (spending.id !== undefined) {
      this.subscribeToSaveResponse(this.spendingService.update(spending));
    } else {
      this.subscribeToSaveResponse(this.spendingService.create(spending));
    }
  }

  private createFromForm(): ISpending {
    return {
      ...new Spending(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      amount: this.editForm.get(['amount']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpending>>) {
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
