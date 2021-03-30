import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Websocket } from './websocket';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockWebsocket: Websocket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    component = TestBed.createComponent(AppComponent).componentInstance;
    mockWebsocket = TestBed.inject(Websocket);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get the status of the websocket', () => {
    expect(component.showOverlay).toBeTrue();

    mockWebsocket.websocketReady.next(false);
    component.ngOnInit();
    expect(component.showOverlay).toBeFalse();

    mockWebsocket.websocketReady.next(true);
    component.ngOnInit();
    expect(component.showOverlay).toBeTrue();
  });
});
