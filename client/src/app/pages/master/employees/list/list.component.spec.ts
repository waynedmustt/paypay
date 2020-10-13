import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { of } from 'rxjs';

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

  it('get list of users who active', inject([HttpClient], (http: HttpClient) => {
    const localFixture = TestBed.createComponent(ListComponent);
    localFixture.detectChanges();
    const app = localFixture.componentInstance;
    spyOn(http, 'get').and.returnValue(of([
      {
        username: 'dimas',
        isActive: true,
      },
      {
        username: 'brian',
        isActive: false,
      }
    ]));
    app.ngOnInit();
    expect(app.dataList.length).toBe(1);
    expect(app.dataList[0].username).toBe('dimas');
  }));
});
