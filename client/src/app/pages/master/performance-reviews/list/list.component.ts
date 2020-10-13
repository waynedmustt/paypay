import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
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
  userLoggedIn: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.userLoggedIn = this.authService.getObjectItem('userLoggedIn');
    this.isLoading = true;
    const listSubscription = this.http.get(
      `${this.baseUrl}/performance-reviews`
    )
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

      const role = this.userLoggedIn && this.userLoggedIn.role && this.userLoggedIn.role.type;
      if (role === 'admin') {
        this.setCompletePerformanceRevList(response);
        this.dataList = response;
        return;
      }

      // show assigneed performance review algorithm
      this.dataList = this.showAssignedPerformanceRevList(response);
    });

    this.listSubscription.push(listSubscription);
  }

  showAssignedPerformanceRevList(response) {
    const userId = this.userLoggedIn && this.userLoggedIn.id;
    const firstFilter = response.filter(perfRev => perfRev.user.id !== userId);

    const finalFilter = [];
    for (const first of firstFilter) {
      const assignees = first && first.assignee;
      if (!assignees || (assignees && assignees.length === 0)) {
        continue;
      }

      for (const assignee of assignees) {
        if (!assignee || !assignee.user || !assignee.user.id) {
          continue;
        }

        const assigneeUserId = assignee.user.id;
        if (assigneeUserId === userId && !assignee.isSubmitted) {
          finalFilter.push(first);
        }
      }
    }

    return finalFilter;
  }

  setCompletePerformanceRevList(response) {
    for (const perfRev of response) {
      let counter = 0;
      const assignees = perfRev.assignee;
      if (!assignees || (assignees && assignees.length === 0)) {
        continue;
      }

      for (const assignee of assignees) {
        if (assignee.isSubmitted) {
          counter++;
        }
      }

      // if all assignees already submitted the feedback, then perf. rev. is completed
      if (counter === assignees.length) {
        perfRev.isCompleted = true;
      }
    }
  }

  getDate(date) {
    return new Date(date).toDateString();
  }

  ngOnDestroy() {
    this.listSubscription.forEach(listSub => listSub.unsubscribe());
  }

}
