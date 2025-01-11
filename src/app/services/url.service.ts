import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  baseUrl = "http://127.0.0.1:8000"

  login = `${this.baseUrl}/login`;
  dash = `${this.baseUrl}/Dash`;
  latestrecord = `${this.baseUrl}/latestrecords`;




}
