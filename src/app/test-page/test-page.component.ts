import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./http.service";
import {AppComponent} from "../app.component";


class User{
  constructor(public id: number, public name: string, public email: string, public hernya: boolean = false) {}
}

@Component({
  selector: "test-page",
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './test-page.component.html',
  providers: [HttpService, AppComponent],
})
export class TestPageComponent {
  name = "What";
  user_name = "";
  user_email = "";

  users: User[] = [];

  ngOnInit() {
    if (!this.appComponent.isAuth()) {
      this.appComponent.getRouter().navigate(["/login-page"])
    }
  }

  constructor(private httpService: HttpService, private appComponent: AppComponent){}

  requestUsers(): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // this.http.get("http://localhost:8080/users").subscribe({next:(data:any) => console.log(data)});

    this.httpService.getData(this.appComponent.getToken()).subscribe({
      next:(data:any) => {
        this.users.splice(0)
        for (const elem of data) {
          this.addUserToList(elem["id"], elem["name"], elem["email"])
        }
      }
    });
  }

  addUserToList(id: number, name: string, email: string): void {
    if(name==null || name.trim()=="" || email==null) {
      return;
    }
    this.users.push(new User(id, name, email));
  }

  addNewUser(name: string, email: string): void {
    if(name==null || name.trim()=="" || email==null) {
      return;
    }

    this.httpService.postData(this.appComponent.getToken(), name, email).subscribe({
      next:(data:any) => {
        console.log("Всё ок")
        this.requestUsers()
      }
    })
  }

  deleteSelectedUsers() {
    for (const user of this.users) {
      if (user.hernya) {
        // console.log(user)
        this.deleteUser(user.id);
      }
    }
  }

  deleteUser(id: number) {
    this.httpService.deleteData(this.appComponent.getToken(), id).subscribe({
      next:(data:any) => {
        this.requestUsers()
      }
    })
  }
}
