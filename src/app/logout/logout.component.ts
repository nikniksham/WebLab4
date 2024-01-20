import {Component, Injectable} from '@angular/core';
import {AppComponent} from "../app.component";
import { Router } from '@angular/router';

function getWindow (): any {
  return window;
}

@Injectable()
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  providers: [AppComponent],
})
export class LogoutComponent {
  ngOnInit() {
    if (!this.appComponent.isAuth()) {
      this.goToLoginPage()
    }
  }

  goToLoginPage() {
    this.appComponent.getRouter().navigate(["/login-page"])
  }

  constructor(private appComponent: AppComponent) {}

  logout() {
    // let token_id = this.appComponent.getTokenId()
    this.appComponent.logout()
    getWindow().location.href = "http://localhost:8080/realms/lab4-realm/protocol/openid-connect/logout"
  }
}
