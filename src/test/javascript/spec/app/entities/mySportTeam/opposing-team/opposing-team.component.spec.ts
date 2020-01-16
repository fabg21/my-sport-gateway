import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySportGatewayTestModule } from '../../../../test.module';
import { OpposingTeamComponent } from 'app/entities/mySportTeam/opposing-team/opposing-team.component';
import { OpposingTeamService } from 'app/entities/mySportTeam/opposing-team/opposing-team.service';
import { OpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';

describe('Component Tests', () => {
  describe('OpposingTeam Management Component', () => {
    let comp: OpposingTeamComponent;
    let fixture: ComponentFixture<OpposingTeamComponent>;
    let service: OpposingTeamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [OpposingTeamComponent],
        providers: []
      })
        .overrideTemplate(OpposingTeamComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OpposingTeamComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OpposingTeamService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OpposingTeam(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.opposingTeams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
