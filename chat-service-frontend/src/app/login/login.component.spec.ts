import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogMock } from '../mat-dialog-mock';
import { ApiEndpointService } from '../api-endpoint.service';
import { of } from 'rxjs';
import { User } from '../user-model';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';
import { MockRouter } from '../router-mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockApiEndpointService;
  let mockMatDialog;
  let mockDataSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        ApiEndpointService,
        DataSharingService,
        { provide: Router, useClass: MockRouter },
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
    .compileComponents();

    mockApiEndpointService = TestBed.inject(ApiEndpointService);
    mockMatDialog = TestBed.inject(MatDialog);
    mockDataSharingService = TestBed.inject(DataSharingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a popUp when username is empty', () => {
    spyOn(mockMatDialog, 'open');

    component.login('');

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should open a popUp if the user already exist', async () => {
    spyOn(mockMatDialog, 'open');
    spyOn(mockApiEndpointService, 'login').and.returnValue(of());

    await component.login('Test User');

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should successfully set the new user and navigate', inject([Router], async (router: Router) => {
    const newUser = new User(1, 'Test User');

    spyOn(mockApiEndpointService, 'login').and.returnValue(of(newUser));
    const spy = spyOn(router, 'navigateByUrl');

    await component.login(newUser.name);

    mockDataSharingService.currentUser.subscribe((user: User) => {
      expect(user).toBe(newUser);
    }).unsubscribe();
    mockDataSharingService.currentLoggedInStatus.subscribe((loggedInStatus: boolean) => {
      expect(loggedInStatus).toBeTrue();
    }).unsubscribe();

    const url = spy.calls.first().args[0];
    expect(url).toBe('/chats');
  }));
});
