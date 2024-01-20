import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class LoginHttpService {

  constructor(private http: HttpClient){ }

  loginRequest(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('client_id', 'base-client')
      .set('client_secret', 'mH2ZcjT91khnzxA67DrWgz1a1miB1dXc')
      // .set('username', username)
      // .set('password', password)
      .set('username', "nikolausus")
      .set('password', "admin")
      .set('grant_type', 'password');
    return this.http.post('http://localhost:8080/realms/lab4-realm/protocol/openid-connect/token', body.toString(),
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
    );
  }
}

