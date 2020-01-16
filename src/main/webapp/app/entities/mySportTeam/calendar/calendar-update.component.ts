import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICalendar, Calendar } from 'app/shared/model/mySportTeam/calendar.model';
import { CalendarService } from './calendar.service';
import { ISeason } from 'app/shared/model/mySportTeam/season.model';
import { SeasonService } from 'app/entities/mySportTeam/season/season.service';

@Component({
  selector: 'jhi-calendar-update',
  templateUrl: './calendar-update.component.html'
})
export class CalendarUpdateComponent implements OnInit {
  isSaving: boolean;

  seasons: ISeason[];

  editForm = this.fb.group({
    id: [],
    seasonId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected calendarService: CalendarService,
    protected seasonService: SeasonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ calendar }) => {
      this.updateForm(calendar);
    });
    this.seasonService.query({ filter: 'calendar-is-null' }).subscribe(
      (res: HttpResponse<ISeason[]>) => {
        if (!this.editForm.get('seasonId').value) {
          this.seasons = res.body;
        } else {
          this.seasonService
            .find(this.editForm.get('seasonId').value)
            .subscribe(
              (subRes: HttpResponse<ISeason>) => (this.seasons = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(calendar: ICalendar) {
    this.editForm.patchValue({
      id: calendar.id,
      seasonId: calendar.seasonId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const calendar = this.createFromForm();
    if (calendar.id !== undefined) {
      this.subscribeToSaveResponse(this.calendarService.update(calendar));
    } else {
      this.subscribeToSaveResponse(this.calendarService.create(calendar));
    }
  }

  private createFromForm(): ICalendar {
    return {
      ...new Calendar(),
      id: this.editForm.get(['id']).value,
      seasonId: this.editForm.get(['seasonId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalendar>>) {
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
}
