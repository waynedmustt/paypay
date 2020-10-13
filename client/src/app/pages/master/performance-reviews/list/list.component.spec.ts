import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        NgZorroAntdModule
      ],
      declarations: [ ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show completed performance reviews when assignee all submitted the feedback',
  inject([HttpClient, AuthService], (http: HttpClient, auth: AuthService) => {
    const firstFixture = TestBed.createComponent(ListComponent);
    firstFixture.detectChanges();
    const app = firstFixture.componentInstance;
    spyOn(auth, 'getObjectItem').and.returnValue({
      user: { name: 'admin'},
      role: { type: 'admin'}
    });
    spyOn(http, 'get').and.returnValue(of([
      {
        name: 'performance reviews 2020',
        isCompleted: false,
        assignee: [
          {
            isSubmitted: true,
          },
          {
            isSubmitted: true,
          }
        ],
      },
      {
        name: 'performance reviews 2019',
        isCompleted: false,
        assignee: [
          {
            isSubmitted: false,
          },
          {
            isSubmitted: true,
          }
        ],
      }
    ]));
    app.ngOnInit();
    expect(app.dataList.length).toBe(2);
    expect(app.dataList[0].isCompleted).toBe(true);
    expect(app.dataList[1].isCompleted).toBe(false);
  }));

  it('show assigned performance reviews for the user who logged in',
  inject([HttpClient, AuthService], (http: HttpClient, auth: AuthService) => {
    const secondFixture = TestBed.createComponent(ListComponent);
    secondFixture.detectChanges();
    const app = secondFixture.componentInstance;
    spyOn(auth, 'getObjectItem').and.returnValue({
      id: 1,
      name: 'dimas',
      role: { type: 'employee'}
    });
    spyOn(http, 'get').and.returnValue(of([
      {
        name: 'performance reviews 2020',
        isCompleted: false,
        user: {
          id: 1
        },
        assignee: [
          {
            user: {
              id: 2
            },
            isSubmitted: false,
          },
          {
            user: {
              id: 3
            },
            isSubmitted: false,
          }
        ],
      },
      {
        name: 'performance reviews 2019',
        isCompleted: false,
        user: {
          id: 2
        },
        assignee: [
          {
            user: {
              id: 1
            },
            isSubmitted: false,
          },
          {
            user: {
              id: 3
            },
            isSubmitted: false,
          }
        ],
      }
    ]));
    app.ngOnInit();
    expect(app.dataList.length).toBe(1);
    expect(app.dataList[0].name).toBe('performance reviews 2019');
  }));

  it('should not show assigned performance reviews if it is already submitted',
  inject([HttpClient, AuthService], (http: HttpClient, auth: AuthService) => {
    const thirdFixture = TestBed.createComponent(ListComponent);
    thirdFixture.detectChanges();
    const app = thirdFixture.componentInstance;
    spyOn(auth, 'getObjectItem').and.returnValue({
      id: 1,
      name: 'dimas',
      role: { type: 'employee'}
    });
    spyOn(http, 'get').and.returnValue(of([
      {
        name: 'performance reviews 2020',
        isCompleted: false,
        user: {
          id: 1
        },
        assignee: [
          {
            user: {
              id: 2
            },
            isSubmitted: false,
          },
          {
            user: {
              id: 3
            },
            isSubmitted: false,
          }
        ],
      },
      {
        name: 'performance reviews 2019',
        isCompleted: false,
        user: {
          id: 2
        },
        assignee: [
          {
            user: {
              id: 1
            },
            isSubmitted: true,
          },
          {
            user: {
              id: 3
            },
            isSubmitted: false,
          }
        ],
      }
    ]));
    app.ngOnInit();
    expect(app.dataList.length).toBe(0);
  }));
});
