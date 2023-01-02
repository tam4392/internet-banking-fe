import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  //   isAdmin = false;
  //   isPartner = false;
  inputText = '';

  constructor() {
    // this.isAdmin = global.isAdmin;
    // this.isPartner = global.isPartner;
  }

  ngOnInit(): void {
    this.inputText = 'chao tam';
  }
}
