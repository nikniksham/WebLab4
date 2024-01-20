import { Component} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `<div>
                    <h1>Приложение Angular</h1>
                    <button (click)="doSmbd()">{{action}}</button>
                    <router-outlet></router-outlet>
               </div>`,
  providers: [CookieService, Router],
})
export class AppComponent {

  constructor(private cookie: CookieService, private router: Router) {}

  action = "Войти"

  ngOnInit() {
    if (this.isAuth()) {
      this.action = "Выйти"
    }
  }

  getRouter(): Router {
    return this.router
  }

  doSmbd() {
    if (this.action == "Войти") {
      this.router.navigate(["/login-page"])
    } else {
      this.router.navigate(["/logout"])
    }
  }

  logout(): void {
    this.action = "Войти"
    this.cookie.set("token", "")
    this.cookie.set("id_token", "")
  }

  setToken(token: string, id_token: string): void {
    this.action = "Выйти"
    this.cookie.set("token", token)
    this.cookie.set("id_token", token)
    this.cookie.set("start", this.toSeconds(new Date()).toString())
  }

  getToken(): string {
    return this.cookie.get("token")
  }

  getTokenId(): string {
    return this.cookie.get("id_token")
  }

  isAuth(): boolean {
    var res = this.cookie.get("token") != "" && (this.toSeconds(new Date()) - parseInt(this.cookie.get("start"))) < 1800
    if (res) {this.action = "Выйти"} else {this.action = "Войти"}
    return res
  }

  toSeconds(now: Date): number {
    return (now.getUTCMonth() * 2678400 + now.getUTCDate() * 86400 + now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds())
  }
}
