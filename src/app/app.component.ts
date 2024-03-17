import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  showMenu = true;
  userName = '';

  constructor(private readonly apiService: ApiService) {}

  ngOnInit() {
    this.subscription.add(
      this.apiService.jwtUserToken.subscribe((token) => {
        if (token) {
          const decoded: any = jwtDecode(token);
          this.userName = decoded.userName;
        }
        if (this.userName) {
          this.showMenu = false;
        } else {
          this.showMenu = true;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.userName = this.apiService.logout();
    this.userName = '';
    this.showMenu = true;
  }
}
