import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, User } from 'app/shared/model/mySportUser/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'jhi-user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    login: [null, [Validators.required]],
    password: []
  });

  constructor(protected userService: UserService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ user }) => {
      this.updateForm(user);
    });
  }

  updateForm(user: IUser) {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      password: user.password
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const user = this.createFromForm();
    if (user.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.update(user));
    } else {
      this.subscribeToSaveResponse(this.userService.create(user));
    }
  }

  private createFromForm(): IUser {
    return {
      ...new User(),
      id: this.editForm.get(['id']).value,
      login: this.editForm.get(['login']).value,
      password: this.editForm.get(['password']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>) {
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
