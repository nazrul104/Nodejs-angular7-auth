import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_URL = 'http://3.9.171.225:3000/';

  constructor(private http: HttpClient) {
  }

  loginService(body: any) {
    return this.http.post<any>(this.API_URL + 'users/login', body);
  }

  registrationService(body: any) {
    return this.http.post<any>(this.API_URL + 'users/registration', body); // ...using post request
  }

  getUserList(str: any) {
    return this.http.get<any>(this.API_URL + 'users/' + str);
  }
}
