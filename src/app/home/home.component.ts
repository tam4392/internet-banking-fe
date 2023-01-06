import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { global } from 'src/core/helper/global.shared';
import { objError, objSuccess } from 'src/core/interface/error.interface';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  customer: any;
  id: any;
  amount: number = 0;
  content: string = '';
  cantClick = false;
  loading = false;

  constructor(
    private CustomerService: CustomerService,
    private messageService: MessageService,
    private Route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomer(global.me.id);
  }

  private getCustomer(id: string) {
    this.CustomerService.detail(id).subscribe((data:any) => {
      if (!data.error) {
        this.customer = data;
        const dobDate = new Date(this.customer.dob);
        this.customer.dob = dobDate.toISOString().substring(0, 10);
      }
    });
  }

  updateCustomer() {
    this.loading = true;

    console.log(JSON.stringify(this.customer));
    this.CustomerService.update(this.customer).subscribe(
      (data: any) => {
        if (!data.error) {
          this.messageService.addAll([objSuccess]);
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.messageService.addAll([objError]);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
