import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { MatchDetailComponent } from 'app/entities/mySportTeam/match/match-detail.component';
import { Match } from 'app/shared/model/mySportTeam/match.model';

describe('Component Tests', () => {
  describe('Match Management Detail Component', () => {
    let comp: MatchDetailComponent;
    let fixture: ComponentFixture<MatchDetailComponent>;
    const route = ({ data: of({ match: new Match(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [MatchDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MatchDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MatchDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.match).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
