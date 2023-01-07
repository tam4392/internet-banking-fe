import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { global } from 'src/core/helper/global.shared';

export const TRANSACTION_TYPE_RECEIVE = 1;
export const TRANSACTION_TYPE_SEND = 3;
export const TRANSACTION_TYPE_PAY_DEBIT = 5;

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})

export class TransactionHistoryComponent implements OnInit {
  
  //   isAdmin = false;
  //   isPartner = false;
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
  
  transactionHistory = [
    { type: "NẠP TIỀN", amount: "+123,345,999,999", time: "2022.12.30 15:04:00", content: "Good job" },
    { type: "NẠP TIỀN", amount: "+123,000", time: "2022.12.29 15:04:00", content: "Good job" },
    { type: "RÚT TIỀN", amount: "-999,999", time: "2022.12.29 12:14:00", content: "Good job" },
    { type: "RÚT TIỀN", amount: "-2,220,000", time: "2022.12.28 13:09:00", content: "Good job" },
    { type: "RÚT TIỀN", amount: "-345,999,999", time: "2022.12.28 10:04:10", content: "Good job" },
    { type: "NẠP TIỀN", amount: "+123,345,000", time: "2022.12.25 13:22:08", content: "Good job" },
    { type: "NẠP TIỀN", amount: "+123,000", time: "2022.12.24 22:15:00", content: "Good job" },
    { type: "NẠP TIỀN", amount: "+999,000", time: "2022.12.23 15:09:00", content: "Good job" }
  ];

  localTransactions: { time: string; type: string; amount: string; content: string; }[] = [];

  constructor(private TransactionService: TransactionService) {
    
  }

  transactions = [];

  ngOnInit(): void {
    this.getLstTransaction(global.me.id);
  }

  getLstTransaction(id: string) {
    this.TransactionService.detail(id).subscribe(
      (data: any) => {
        var tmpList: { time: string; type: string; amount: string; content: string; }[] = [];
        this.lstTransaction = data.data;
        console.log(data);
        this.lstTransaction.forEach(function(item: { createdAt: Date; type: number; amount: string; content: string; }) {
          var transactionType = "";
          var displayAmount = "";
          var creatAt = item.createdAt.toString();

          if (item.type == TRANSACTION_TYPE_RECEIVE) {
            transactionType = "NẠP TIỀN";
            displayAmount = "+" + item.amount;
          } else {
            transactionType = "RÚT TIỀN";
            displayAmount = item.amount;
          }
        
          tmpList.push(
            { type: transactionType, amount: displayAmount, time: creatAt, content: item.content }
          )
        })
        this.totalCount = data.totalCount;
        this.localTransactions = tmpList;
        
      },
      (error: HttpErrorResponse) => {},
      () => {}
    );
  }
}
