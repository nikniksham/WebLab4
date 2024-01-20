import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppComponent} from "../app.component";
import {SpecialService} from "./special.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-special',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './special.component.html',
  styleUrl: './special.component.css',
  providers: [ AppComponent, SpecialService]
})
export class SpecialComponent {
  constructor(private activatedRoute: ActivatedRoute, private specialService: SpecialService, private appComponent: AppComponent) {}
  // constructor(private activatedRoute: ActivatedRoute, private appComponent: AppComponent) {}
  message = ""
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['code']) {
        // console.log(params['code']);
        this.specialService.getJwtToken(params['code']).subscribe(
          {
            next:(data:any) => {
              // console.log(data)
              if (data["access_token"]) {
                this.appComponent.setToken(data["access_token"], data["id_token"])
                this.message = "Ура, авторизация сработала"
              }
            },
            error:(msg:any) => {
              this.message = "Увы, что-то пошло через задницу"
              // console.log(msg)
            }})
      }
    });
  }

  toContent(): void {
    this.appComponent.getRouter().navigate(["/mainpage"])
  }
}
