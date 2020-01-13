import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySportGatewayTestModule } from '../../../../test.module';
import { IncomingsComponent } from 'app/entities/mySportFinancial/incomings/incomings.component';
import { IncomingsService } from 'app/entities/mySportFinancial/incomings/incomings.service';
import { Incomings } from 'app/shared/model/mySportFinancial/incomings.model';

describe('Component Tests', () => {
  describe('Incomings Management Component', () => {
    let comp: IncomingsComponent;
    let fixture: ComponentFixture<IncomingsComponent>;
    let service: IncomingsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [IncomingsComponent],
        providers: []
      })
        .overrideTemplate(IncomingsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IncomingsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IncomingsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Incomings(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.incomings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
