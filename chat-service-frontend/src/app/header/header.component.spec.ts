import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../user-model';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  class MatDialogMock {
    open() {
     return {
       afterClosed: () => of(true)
     };
   }
 }

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockDataSharingService;
  let mockMatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        DataSharingService,
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
    .compileComponents();

    mockDataSharingService = TestBed.inject(DataSharingService);
    mockMatDialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the logIn Status correctly', () => {
    component.ngOnInit();
    expect(component.loggedIn).toBeFalse();

    mockDataSharingService.currentLoggedInStatus = of(true);

    component.ngOnInit();
    expect(component.loggedIn).toBeTrue();
  });

  it('should open the popUp new chat', () => {
    mockDataSharingService.currentUser = of(new User(1, 'Test User'));
    spyOn(mockMatDialog, 'open');

    component.newChat();

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should open the popUp new chat', () => {
    mockDataSharingService.currentUser = of(new User(1, 'Test User'));
    spyOn(mockMatDialog, 'open');

    component.logOut();

    expect(mockMatDialog.open).toHaveBeenCalled();
  });
});
