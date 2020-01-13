import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySportGatewayTestModule } from '../../../../test.module';
import { SpendingComponent } from 'app/entities/mySportFinancial/spending/spending.component';
import { SpendingService } from 'app/entities/mySportFinancial/spending/spending.service';
import { Spending } from 'app/shared/model/mySportFinancial/spending.model';

describe('Component Tests', () => {
  describe('Spending Management Component', () => {
    let comp: SpendingComponent;
    let fixture: ComponentFixture<SpendingComponent>;
    let service: SpendingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [SpendingComponent],
        providers: []
      })
        .overrideTemplate(SpendingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpendingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpendingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Spending(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.spendings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
