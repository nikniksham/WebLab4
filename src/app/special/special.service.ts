import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SpecialService {

  constructor(private http: HttpClient){ }

  // getJwtToken_legacy(code: string): Observable<any> {
  //   const body = new HttpParams()
  //     .set('grant_type', 'authorization_code')
  //     .set('client_id', 'base-client')
  //     .set('client_secret', 'mH2ZcjT91khnzxA67DrWgz1a1miB1dXc')
  //     .set('code', code)
  //     // .set('redirect_uri', "http://localhost:4200/special");
  //   return this.http.post('http://localhost:8080/realms/lab4-realm/protocol/openid-connect/token', body.toString(),
  //     {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
  //   );
  // }

  getJwtToken(code: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.get("http://localhost:8090/CorsPidaras/" + code, {headers})
  }
}

