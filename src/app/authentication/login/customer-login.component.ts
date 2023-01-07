import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { objError, objSuccess } from '../../../core/interface/error.interface';
import { global } from '../../../core/helper/global.shared';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
  providers: [MessageService],
})
export class CustomerLoginComponent implements OnInit {
  userName = '';
  password = '';
  loading = false;
  check = false;
  private loginSubscribe!: Subscription;

  constructor(
    private messageService: MessageService,
    private AuthenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  showResponse(event: any) {
    this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
    this.check = true;
  }

  login() {
    if (this.check) {
      this.loginSubscribe = this.AuthenticationService.customerLogin({
        username: this.userName,
        password: this.password,
      }).subscribe(
        (data) => {
          this.messageService.addAll([objSuccess]);
          if (!data.error) {
            global.setToken(data.accessToken);
            global.setRefreshToken(data.refreshToken);
            setTimeout(() => {
              this.router.navigate(['/'], {
                relativeTo: this.route,
              });
            }, 300);
          } else {
            this.loading = false;
          }
        },
        (error: HttpErrorResponse) => {
          this.messageService.addAll([objError]);
          this.loading = false;
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Captcha is not correct',
        sticky: true,
      });
    }
  }
}
