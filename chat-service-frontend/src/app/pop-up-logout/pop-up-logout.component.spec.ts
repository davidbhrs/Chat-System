import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiEndpointService } from '../api-endpoint.service';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../models/user-model';
import { MockRouter } from '../mocks/router-mock';

import { PopUpLogoutComponent } from './pop-up-logout.component';
import { Websocket } from '../websocket';

describe('PopUpLogoutComponent', () => {
  let component: PopUpLogoutComponent;
  let fixture: ComponentFixture<PopUpLogoutComponent>;
  let mockWebsocket;
  let mockDataSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpLogoutComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        Websocket,
        DataSharingService,
        { provide: Router, useClass: MockRouter },
        { provide: MAT_DIALOG_DATA, useValue: new User(1, 'Test User') }
      ]
    })
    .compileComponents();

    mockWebsocket = TestBed.inject(Websocket);
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
    spyOn(mockWebsocket, 'deleteUser').and.returnValue(of(undefined));
    spyOn(mockWebsocket, 'disconnect').and.returnValue(null);
    const spy = spyOn(router, 'navigateByUrl');

    await component.logOut();

    mockDataSharingService.currentLoggedInStatus.subscribe((loggedInStatus: boolean) => {
      expect(loggedInStatus).toBeFalse();
    });

    const url = spy.calls.first().args[0];
    expect(url).toBe('/login');
  }));
});
