import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  private listSubscription: Subscription[] = [];
  private baseUrl = '';
  dataList = [];
  isLoading = false;

  constructor(
    private modal: NzModalService,
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.callUsers(null);
  }

  showDeleteConfirm(deletedId): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this employee?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteEmployee(deletedId);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteEmployee(id) {
    this.callUsers(id);
  }

  callUsers(id) {
    this.isLoading = true;
    const payload = {
      isActive: false
    };
    const listSubscription = this.getEmployeeHttpRequestInstance(id, payload)
    .pipe(
      catchError(err => {
        this.isLoading = false;
        return of({
          success: false,
          message: err
        });
      })
    ).subscribe((response: any) => {
      this.isLoading = false;
      if (!response || response.success === false) {
        return of({
          success: false,
          message: 'error occurred'
        });
      }

      if (id) {
        this.callUsers(null);
        return;
      }
      const activeUsers = response.filter((user) => user.isActive);
      this.dataList = activeUsers;
    });

    this.listSubscription.push(listSubscription);
  }

  getEmployeeHttpRequestInstance(id, payload) {
    if (id) {
      return this.http.put(
        `${this.baseUrl}/users/${id}`,
        payload
      );
    }

    return this.http.get(
      `${this.baseUrl}/users`
    );
  }

  ngOnDestroy() {
    this.listSubscription.forEach(listSub => listSub.unsubscribe());
  }

}
