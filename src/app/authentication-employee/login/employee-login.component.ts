import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { objError, objSuccess } from '../../../core/interface/error.interface';
import { global } from '../../../core/helper/global.shared';
import { AuthenticationService } from '../../../core/services/authentication.service';
import {
  EMPLOYEE_TYPE_ADMIN,
  EMPLOYEE_TYPE_NORMAL,
} from 'src/core/interface/authentication.interface';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss'],
  providers: [MessageService],
})
export class EmployeeLoginComponent implements OnInit {
  email = '';
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
    this.messageService.add({
      severity: 'info',
      summary: 'Succees',
      detail: 'User Responded',
      sticky: true,
    });
    this.check = true;
  }

  login() {
    if (this.check) {
      this.loginSubscribe = this.AuthenticationService.employeeLogin({
        email: this.email,
        password: this.password,
      }).subscribe(
        (data) => {
          this.messageService.addAll([objSuccess]);
          if (!data.error) {
            global.setToken(data.accessToken);
            global.setRefreshToken(data.refreshToken);
            const type = global.me?.type;
            if (type === EMPLOYEE_TYPE_NORMAL) {
              setTimeout(() => {
                this.router.navigate(['/employee-create-account'], {
                  relativeTo: this.route,
                });
              }, 300);
            } else {
              setTimeout(() => {
                this.router.navigate(['/manage-employee'], {
                  relativeTo: this.route,
                });
              }, 300);
            }
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
