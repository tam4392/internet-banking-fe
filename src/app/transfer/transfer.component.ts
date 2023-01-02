import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  //   isAdmin = false;
  //   isPartner = false;
  inputText = '';
  dataRes = [];

  constructor() {
    // this.isAdmin = global.isAdmin;
    // this.isPartner = global.isPartner;
  }

  ngOnInit(): void {
    this.inputText = 'chao tam';
  }

  //event call api
  //   this.dataRes = data;
}
