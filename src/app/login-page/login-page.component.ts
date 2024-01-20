import { Component } from '@angular/core';
import {LoginHttpService} from "./login.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../app.component";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

function getWindow (): any {
  return window;
}

@Injectable()
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [LoginHttpService, AppComponent],
})
export class LoginPageComponent {
  userNickname = ""
  userPassword = ""
  message = ""

  ngOnInit() {
    this.checkAuth()
  }

  checkAuth() {
    if (this.appComponent.isAuth()) {
      this.appComponent.getRouter().navigate(["/mainpage"])
    }
  }

  redirectToKeyCloak() {
    // console.log(getWindow().location.href)
    getWindow().location.href = "http://localhost:8080/realms/lab4-realm/protocol/openid-connect/auth?response_type=code&client_id=base-client&state=safgsaf3232fasd&scope=openid profile&redirect_uri=http://localhost:4200/special"
  }

  constructor(private loginHttpService: LoginHttpService, private appComponent: AppComponent) {}

  loginUser(nickname: string, password: string): void {
    this.message = ""
    this.loginHttpService.loginRequest(nickname, password).subscribe(
      {
        next:(data:any) => {
          this.appComponent.setToken(data.access_token, data.id_token)
          this.checkAuth()
        },
        error:(msg:any) => {
          this.message = "Неверный логин или пароль"
        }
      }
    )
  }
}
