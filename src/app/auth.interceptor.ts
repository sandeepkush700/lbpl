import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { CommonService } from './services/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service:CommonService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.service.show();
    return next.handle(req).pipe(
      finalize(() => {
        setTimeout(()=>{
          this.service.hide();
        },500)
      })
    );
  }
}
