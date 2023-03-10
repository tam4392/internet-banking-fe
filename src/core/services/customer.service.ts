import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from '../helper/base-service.helper';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  base = 'customers';
  constructor(protected httpClient: HttpClient, protected router: Router) {
    super();
  }

  get(params: {
    total?: '1' | '';
    next_page?: '';
    limit?: number;
    field?: string;
    [index: string]: any;
  }): Observable<any> {
    return this.call({ url: '', params }, 'get');
  }

  detail(id: string): Observable<any> {
    return this.call({ url: '/' + id }, 'get');
  }

  insert(data: any): Observable<any> {
    console.log(data);
    return this.call({ url: '', body: data }, 'post');
  }

  update(data: any): Observable<any> {
    return this.call({ url: '', body: data }, 'patch');
  }

  updateAccountBalance(id: number, data: any): Observable<any> {
    return this.call({ url: '/' + id, body: data }, 'patch');
  }

  search(params: { [index: string]: any }): Observable<any> {
    return this.call({ url: '/search-by-account', params }, 'get');
  }
}
