import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
@Component({
  selector: 'app-employee-deposit-money',
  templateUrl: './employee-deposit-money.component.html',
  styleUrls: ['./employee-deposit-money.component.scss'],
})
export class EmployeeDepositMoneyComponent implements OnInit {
  lstCustomer: any[] = [];

  constructor(private CustomerService: CustomerService) {}

  ngOnInit(): void {
    this.getLstCustomer({});
  }

  private getLstCustomer(filter: any) {
    this.CustomerService.get(filter).subscribe((data: any) => {
      if (!data.error) {
        this.lstCustomer = data;
      }
    });
  }
}
