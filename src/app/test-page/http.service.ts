import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient){ }

  getData(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get("http://localhost:8090/users", {headers})
  }

  postData(token: string, name: String, email: String){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post("http://localhost:8090/users", {"name": name, "email": email}, {headers})
  }

  deleteData(token: string, userId: number) {
    let httpParams = new HttpParams().set('userId', userId)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete("http://localhost:8090/users", {params: httpParams, headers})
  }

  /*putData(userId: number) {
    console.log("123")
    return this.http.post("http://localhost:8090/users", {"id": userId}).subscribe(data=>console.log(data));
  }*/
}

