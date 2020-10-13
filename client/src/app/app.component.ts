import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isLoggedIn$: Observable<boolean>;
  isLoggedIn = false;
  activeTab = '';
  masterMenus = ['employees', 'performanceReviews'];
  userLoggedIn: any;
  visibleMenus = {
    employees: ['admin'],
    performanceReviews: ['employee', 'admin']
  };

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(response => {
      this.isLoggedIn = response;
      this.userLoggedIn = this.authService.getObjectItem('userLoggedIn');
    });
    this.setActiveTab(this._getPersistedActiveTab() || 'welcome');
  }

  setActiveTab(tab) {
    this._setPersistedActiveTab(tab);
    this.activeTab = tab;
  }

  isVisible(tab) {
    const role = this.userLoggedIn && this.userLoggedIn.role && this.userLoggedIn.role.type;
    return this.visibleMenus[tab] && this.visibleMenus[tab].indexOf(role) !== -1;
  }

  private _setPersistedActiveTab(tab) {
    localStorage.setItem('activeTab', tab);
  }

  private _getPersistedActiveTab() {
    return localStorage.getItem('activeTab');
  }

  logout() {
    this.authService.logout();
  }
}
