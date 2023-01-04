import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, NavigationEnd, Event, ActivationEnd } from '@angular/router';
import { global } from '../core/helper/global.shared';
import { EMPLOYEE_TYPE_NORMAL } from 'src/core/interface/authentication.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'internet-banking-fe';
  type = global.me?.type;

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      // if (event instanceof NavigationEnd) {
      //   const currRoute = event.url.replace('#loading', '');
      //   const token = Object.keys(global.initToken()).length > 0;
      //   if (
      //     !token &&
      //     (currRoute.includes('employee-') || currRoute.includes('manage-'))
      //   ) {
      //     this.router.navigate(['/authentication-employee/login']);
      //   } else if (!token) {
      //     this.router.navigate(['/authentication/login']);
      //   }
      // }
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
