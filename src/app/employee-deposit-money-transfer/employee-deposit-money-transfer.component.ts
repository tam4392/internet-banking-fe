import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { objError, objSuccess } from 'src/core/interface/error.interface';
import {
  TRANSACTION_PAYMENT_TYPE_PAID_SENDER,
  TRANSACTION_TYPE_SEND,
} from 'src/core/interface/transaction.interface';
import { CustomerService } from '../../core/services/customer.service';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-employee-deposit-money-transfer',
  templateUrl: './employee-deposit-money-transfer.component.html',
  styleUrls: ['./employee-deposit-money-transfer.component.scss'],
  providers: [MessageService],
})
export class EmployeeDepositMoneyTransferComponent implements OnInit {
  customer: any;
  id: any;
  amount: number = 0;
  content: string = '';
  cantClick = true;
  loading = false;

  constructor(
    private CustomerService: CustomerService,
    private TransactionService: TransactionService,
    private messageService: MessageService,
    private Route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.getCustomer(Number(this.id));
  }

  private getCustomer(id: any) {
    this.CustomerService.detail(id).subscribe((data: any) => {
      if (!data.error) {
        this.customer = data;
      }
    });
  }

  formatData() {
    return {
      sendAccountNum: this.customer.id,
      receiveAccountNum: this.customer.id,
      receiveName: this.customer.name,
      amount: this.amount,
      content: this.content,
      sendBankId: this.customer.bankId,
      receiveBankId: this.customer.bankId,
      paymentType: TRANSACTION_PAYMENT_TYPE_PAID_SENDER,
      type: TRANSACTION_TYPE_SEND,
    };
  }

  checkDisabledSave() {
    this.cantClick = this.amount > 0 ? false : true;
  }

  updateAccountBalance() {
    this.customer.accountBalance += this.amount;
    this.loading = true;
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
        this.transfer();
      }
    );
  }

  transfer() {
    this.TransactionService.create(this.formatData()).subscribe(
      (data) => {
        setTimeout(
          () => this.router.navigate(['/employee-deposit-money']),
          200
        );
      },
      (error: HttpErrorResponse) => {},
      () => {}
    );
  }
}
