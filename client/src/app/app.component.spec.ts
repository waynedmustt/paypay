import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { IconsProviderModule } from './icons-provider.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgZorroAntdModule,
        IconsProviderModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as isCollapsed 'false'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isCollapsed).toEqual(false);
  });

  it('employee menu should be visible when admin logged in', inject([AuthService], (auth: AuthService) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    spyOn(auth, 'getObjectItem').and.returnValue({
      name: 'admin',
      role: { type: 'admin'}
    });
    app.ngOnInit();
    expect(app.isVisible('employees')).toBe(true);
  }));

  it('employee menu should not be visible when employee logged in', inject([AuthService], (auth: AuthService) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    spyOn(auth, 'getObjectItem').and.returnValue({
      name: 'dimas',
      role: { type: 'employee'}
    });
    app.ngOnInit();
    expect(app.isVisible('employees')).toBe(false);
  }));
});
