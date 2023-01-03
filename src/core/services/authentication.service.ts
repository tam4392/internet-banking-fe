import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from '../helper/base-service.helper';
import { EmployeeLoginDataInterface } from '../interface/authentication.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  base = 'auth';
  constructor(protected httpClient: HttpClient, protected router: Router) {
    super();
  }

  employeeLogin(data: EmployeeLoginDataInterface): Observable<any> {
    return this.call({ url: '/employee/signin', body: data }, 'post');
  }
}
