import { Component, OnInit } from '@angular/core';
import {OrderListModule} from 'primeng/orderlist';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  //   isAdmin = false;
  //   isPartner = false;
  inputText = '';
  search = '';
  rows = 10;
  first = 0;
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
    { check: false, transaction: "NẠP TIỀN", amount: "+123,345,999,999", time: "2022.12.30 15:04:00", message: "Good job" },
    { check: false, transaction: "NẠP TIỀN", amount: "+123,000", time: "2022.12.29 15:04:00", message: "Good job" },
    { check: false, transaction: "RÚT TIỀN", amount: "-999,999", time: "2022.12.29 12:14:00", message: "Good job" },
    { check: false, transaction: "RÚT TIỀN", amount: "-2,220,000", time: "2022.12.28 13:09:00", message: "Good job" },
    { check: false, transaction: "RÚT TIỀN", amount: "-345,999,999", time: "2022.12.28 10:04:10", message: "Good job" },
    { check: false, transaction: "NẠP TIỀN", amount: "+123,345,000", time: "2022.12.25 13:22:08", message: "Good job" },
    { check: false, transaction: "NẠP TIỀN", amount: "+123,000", time: "2022.12.24 22:15:00", message: "Good job" },
    { check: false, transaction: "NẠP TIỀN", amount: "+999,000", time: "2022.12.23 15:09:00", message: "Good job" }
  ];

  constructor() {
    // this.isAdmin = global.isAdmin;
    // this.isPartner = global.isPartner;
  }

  ngOnInit(): void {
    this.inputText = 'chao tam';
  }
}
