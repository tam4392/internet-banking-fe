import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from '../helper/base-service.helper';

@Injectable({
  providedIn: 'root',
})
export class OTPService extends BaseService {
  base = 'code-verify';
  constructor(protected httpClient: HttpClient, protected router: Router) {
    super();
  }

  create(data: any): Observable<any> {
    return this.call({ url: '', body: data }, 'post');
  }

  verifyOTP(data: any): Observable<any> {
    return this.call({ url: '/check', body: data }, 'post');
  }
}
