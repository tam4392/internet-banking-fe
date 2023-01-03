import { environment } from 'src/environments/environment';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { global } from './global.shared';
import { Observable } from 'rxjs';

interface data {
  url?: string;
  params?: any;
  body?: any;
}

export abstract class BaseService {
  protected apiServer = `${environment.api_domain}${environment.api_prefix}`;
  protected base: string = '';
  protected abstract httpClient: HttpClient;
  protected abstract router: Router;
  private options(): any {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + global.initToken(),
      }),
    };
  }

  private baseGet(data: data): Observable<any> {
    return this.httpClient.get(data.url || '', {
      ...this.options(),
      ...{ params: data.params ?? {} },
    });
  }

  private basePost(data: data): Observable<any> {
    return this.httpClient.post(
      data.url || '',
      data.body ?? {},
      this.options()
    );
  }

  private basePut(data: data): Observable<any> {
    return this.httpClient.put(data.url || '', data.body ?? {}, this.options());
  }

  private baseDelete(data: data): Observable<any> {
    return this.httpClient.delete(data.url || '', {
      ...this.options(),
      ...{ params: data.params ?? {} },
    });
  }

  private wrap(run: Observable<any>): Observable<any> {
    return new Observable((subscriber) => {
      run.subscribe(
        (data) => subscriber.next(data),
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            global.removeToken();
            if (this.router) {
              this.router.navigate(['/authentication/login'], {
                fragment: 'loading',
              });
            }
          }
          subscriber.error(error);
        },
        () => {
          subscriber.complete();
        }
      );
    });
  }

  protected call(data: data, method: 'get' | 'post' | 'put' | 'delete') {
    let run: Observable<any>;
    data.url = this.apiServer + this.base + data.url;
    switch (method) {
      case 'get':
        run = this.baseGet(data);
        break;
      case 'post':
        run = this.basePost(data);
        break;
      case 'put':
        run = this.basePut(data);
        break;
      default:
        run = this.baseDelete(data);
        break;
    }
    return this.wrap(run);
  }
}
