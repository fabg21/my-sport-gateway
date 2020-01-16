import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MatchService } from 'app/entities/mySportTeam/match/match.service';
import { IMatch, Match } from 'app/shared/model/mySportTeam/match.model';

describe('Service Tests', () => {
  describe('Match Service', () => {
    let injector: TestBed;
    let service: MatchService;
    let httpMock: HttpTestingController;
    let elemDefault: IMatch;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(MatchService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Match(0, 'AAAAAAA', currentDate, currentDate, currentDate, 'AAAAAAA', 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
            appointmentHour: currentDate.format(DATE_TIME_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Match', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT),
            appointmentHour: currentDate.format(DATE_TIME_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            appointmentHour: currentDate,
            startTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new Match(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Match', () => {
        const returnedFromService = Object.assign(
          {
            type: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT),
            appointmentHour: currentDate.format(DATE_TIME_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            place: 'BBBBBB',
            result: 1,
            scoreFor: 1,
            scoreAgainst: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            appointmentHour: currentDate,
            startTime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Match', () => {
        const returnedFromService = Object.assign(
          {
            type: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT),
            appointmentHour: currentDate.format(DATE_TIME_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            place: 'BBBBBB',
            result: 1,
            scoreFor: 1,
            scoreAgainst: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            appointmentHour: currentDate,
            startTime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Match', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
