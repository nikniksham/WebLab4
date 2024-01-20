import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class MainpageService{

  constructor(private http: HttpClient){ }

  getData(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get("http://localhost:8090/resOfHit", {headers})
  }

  postData(token: string, x: number, y: number, r: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    // console.log(x + " " + y + " " + r)
    return this.http.post("http://localhost:8090/resOfHit", {"x": x, "y": y, "r": r}, {headers})
  }

  deleteData(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete("http://localhost:8090/resOfHit", {headers})
  }
}

