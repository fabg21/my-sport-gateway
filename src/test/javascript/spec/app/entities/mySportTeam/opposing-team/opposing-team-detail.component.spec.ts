import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { OpposingTeamDetailComponent } from 'app/entities/mySportTeam/opposing-team/opposing-team-detail.component';
import { OpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';

describe('Component Tests', () => {
  describe('OpposingTeam Management Detail Component', () => {
    let comp: OpposingTeamDetailComponent;
    let fixture: ComponentFixture<OpposingTeamDetailComponent>;
    const route = ({ data: of({ opposingTeam: new OpposingTeam(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [OpposingTeamDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OpposingTeamDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OpposingTeamDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.opposingTeam).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
