import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from '../helper/base-service.helper';

@Injectable({
  providedIn: 'root',
})
export class BankService extends BaseService {
  base = 'banks';
  constructor(protected httpClient: HttpClient, protected router: Router) {
    super();
  }
  get(id: string): Observable<any> {
    return this.call({ url: '/' + id }, 'get');
  }

  detail(id: string): Observable<any> {
    return this.call({ url: '/' + id }, 'get');
  }

  update(data: any): Observable<any> {
    return this.call({ url: '', body: data }, 'patch');
  }

  updateAccountBalance(id: number, data: any): Observable<any> {
    return this.call({ url: '/' + id, body: data }, 'patch');
  }
}
