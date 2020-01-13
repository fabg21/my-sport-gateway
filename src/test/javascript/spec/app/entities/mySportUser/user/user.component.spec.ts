import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySportGatewayTestModule } from '../../../../test.module';
import { UserComponent } from 'app/entities/mySportUser/user/user.component';
import { UserService } from 'app/entities/mySportUser/user/user.service';
import { User } from 'app/shared/model/mySportUser/user.model';

describe('Component Tests', () => {
  describe('User Management Component', () => {
    let comp: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let service: UserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [UserComponent],
        providers: []
      })
        .overrideTemplate(UserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new User(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.users[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
