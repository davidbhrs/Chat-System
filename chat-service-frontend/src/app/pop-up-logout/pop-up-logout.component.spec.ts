import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiEndpointService } from '../api-endpoint.service';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../user-model';
import { MockRouter } from '../router-mock';

import { PopUpLogoutComponent } from './pop-up-logout.component';

describe('PopUpLogoutComponent', () => {
  let component: PopUpLogoutComponent;
  let fixture: ComponentFixture<PopUpLogoutComponent>;
  let mockApiEndpointService;
  let mockDataSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpLogoutComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiEndpointService,
        DataSharingService,
        { provide: Router, useClass: MockRouter },
        { provide: MAT_DIALOG_DATA, useValue: new User(1, 'Test User') }
      ]
    })
    .compileComponents();

    mockApiEndpointService = TestBed.inject(ApiEndpointService);
    mockDataSharingService = TestBed.inject(DataSharingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.user).toEqual(new User(1, 'Test User'));
  });

  it('should log the current user out and navigate', inject([Router], async (router: Router) => {
    spyOn(mockApiEndpointService, 'logOut').and.returnValue(of(undefined));
    const spy = spyOn(router, 'navigateByUrl');

    await component.logOut();

    mockDataSharingService.currentLoggedInStatus.subscribe((loggedInStatus: boolean) => {
      expect(loggedInStatus).toBeFalse();
    });

    const url = spy.calls.first().args[0];
    expect(url).toBe('/login');
  }));
});
