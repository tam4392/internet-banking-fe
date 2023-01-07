import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { global } from 'src/core/helper/global.shared';
import { transactionTypeList } from 'src/core/interface/transaction.interface';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  lstTransaction: any;
  search = '';
  rows = 10;
  first = 0;
  totalCount = 0;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  localTransactions: {
    time: string;
    type: string;
    amount: string;
    content: string;
  }[] = [];

  constructor(private TransactionService: TransactionService) {}

  transactions = [];

  ngOnInit(): void {
    this.getLstTransaction(global.me.id);
  }

  getLstTransaction(id: string) {
    this.TransactionService.getOwnerDetail(id).subscribe(
      (data: any) => {
        this.totalCount = data.totalCount;
        this.localTransactions = data.data;
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
