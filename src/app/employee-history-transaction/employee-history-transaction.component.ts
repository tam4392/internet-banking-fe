import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { objError, objSuccess } from 'src/core/interface/error.interface';
import {
  transactionTypeList,
  TRANSACTION_PAYMENT_TYPE_PAID_SENDER,
  TRANSACTION_TYPE_SEND,
} from 'src/core/interface/transaction.interface';
import { CustomerService } from '../../core/services/customer.service';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-employee-history-transaction',
  templateUrl: './employee-history-transaction.component.html',
  styleUrls: ['./employee-history-transaction.component.scss'],
  providers: [MessageService],
})
export class EmployeeHistoryTransactionComponent implements OnInit {
  lstTransaction: any;
  id: any;
  amount: number = 0;
  content: string = '';
  cantClick = true;
  loading = false;
  totalCount = 0;

  constructor(
    private CustomerService: CustomerService,
    private TransactionService: TransactionService,
    private messageService: MessageService,
    private Route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLstTransaction({});
  }

  getLstTransaction(filter: any) {
    this.TransactionService.get(filter).subscribe(
      (data) => {
        this.lstTransaction = data.data;
        this.totalCount = data.totalCount;
        console.log(data);
      },
      (error: HttpErrorResponse) => {},
      () => {}
    );
  }

  getTransactionType(type: any) {
    const itemType = transactionTypeList.find(
      (obj) => obj.value === Number(type)
    );

    return itemType?.text;
  }
}
