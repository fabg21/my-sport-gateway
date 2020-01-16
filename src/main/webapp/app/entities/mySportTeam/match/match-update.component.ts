import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMatch, Match } from 'app/shared/model/mySportTeam/match.model';
import { MatchService } from './match.service';
import { IOpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';
import { OpposingTeamService } from 'app/entities/mySportTeam/opposing-team/opposing-team.service';
import { ICalendar } from 'app/shared/model/mySportTeam/calendar.model';
import { CalendarService } from 'app/entities/mySportTeam/calendar/calendar.service';

@Component({
  selector: 'jhi-match-update',
  templateUrl: './match-update.component.html'
})
export class MatchUpdateComponent implements OnInit {
  isSaving: boolean;

  opposingteams: IOpposingTeam[];

  calendars: ICalendar[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    date: [null, [Validators.required]],
    appointmentHour: [],
    startTime: [],
    place: [],
    result: [],
    scoreFor: [],
    scoreAgainst: [],
    opponentId: [],
    calendarId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected matchService: MatchService,
    protected opposingTeamService: OpposingTeamService,
    protected calendarService: CalendarService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ match }) => {
      this.updateForm(match);
    });
    this.opposingTeamService
      .query()
      .subscribe(
        (res: HttpResponse<IOpposingTeam[]>) => (this.opposingteams = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.calendarService
      .query()
      .subscribe((res: HttpResponse<ICalendar[]>) => (this.calendars = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(match: IMatch) {
    this.editForm.patchValue({
      id: match.id,
      type: match.type,
      date: match.date,
      appointmentHour: match.appointmentHour != null ? match.appointmentHour.format(DATE_TIME_FORMAT) : null,
      startTime: match.startTime != null ? match.startTime.format(DATE_TIME_FORMAT) : null,
      place: match.place,
      result: match.result,
      scoreFor: match.scoreFor,
      scoreAgainst: match.scoreAgainst,
      opponentId: match.opponentId,
      calendarId: match.calendarId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const match = this.createFromForm();
    if (match.id !== undefined) {
      this.subscribeToSaveResponse(this.matchService.update(match));
    } else {
      this.subscribeToSaveResponse(this.matchService.create(match));
    }
  }

  private createFromForm(): IMatch {
    return {
      ...new Match(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      date: this.editForm.get(['date']).value,
      appointmentHour:
        this.editForm.get(['appointmentHour']).value != null
          ? moment(this.editForm.get(['appointmentHour']).value, DATE_TIME_FORMAT)
          : undefined,
      startTime:
        this.editForm.get(['startTime']).value != null ? moment(this.editForm.get(['startTime']).value, DATE_TIME_FORMAT) : undefined,
      place: this.editForm.get(['place']).value,
      result: this.editForm.get(['result']).value,
      scoreFor: this.editForm.get(['scoreFor']).value,
      scoreAgainst: this.editForm.get(['scoreAgainst']).value,
      opponentId: this.editForm.get(['opponentId']).value,
      calendarId: this.editForm.get(['calendarId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatch>>) {
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

  trackOpposingTeamById(index: number, item: IOpposingTeam) {
    return item.id;
  }

  trackCalendarById(index: number, item: ICalendar) {
    return item.id;
  }
}
