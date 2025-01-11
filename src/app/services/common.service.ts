import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private url: UrlService, private http: HttpClient) { }

 
   token = localStorage.getItem('token')


  async Login(input: any) {
    let obj = JSON.stringify(input)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    try {
      return await this.http.post(this.url.login, obj, httpOptions).toPromise()
    } catch (error: any) {
      return error['error']
    }
  }

  async Dash(input: any) {
    let newtoken
    if(this.token){

      newtoken = JSON.parse(this.token);
    }


    let obj = JSON.stringify(input)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newtoken}`
      })
    };
    try {
      return await this.http.post(this.url.dash, obj, httpOptions).toPromise()
    } catch (error: any) {
      return error['error']
    }
  }

  async LatestData() {
    let newtoken
    if(this.token){

      newtoken = JSON.parse(this.token);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newtoken}`
      })
    };
    try {
      return await this.http.get(this.url.latestrecord, httpOptions).toPromise()
    } catch (error: any) {
      return error['error']
    }
  }

}
