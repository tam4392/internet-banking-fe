import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //   isAdmin = false;
  //   isPartner = false;
  username: string;
  password: string;
  fullname: string;
  accountNum: string;
  balance: Number;
  dob: string;
  address: string;
  email: string;
  phone: string;

  constructor() {
    // this.isAdmin = global.isAdmin;
    // this.isPartner = global.isPartner;
    this.username = '';
    this.password = '';
    this.fullname = '';
    this.accountNum = '';
    this.balance = 0;
    this.dob = '';
    this.address='';
    this.email='';
    this.phone='';
  }

  ngOnInit(): void {
    this.username = 'chao tam';
    this.password = '123456';
    this.fullname = 'Nguyễn Văn A';
    this.accountNum = '1234578412';
    this.balance = 15000.0;
    this.dob = '1998-12-12';
    this.address='365 Nguyễn Văn Trỗi Street';
    this.email='user01@email.com';
    this.phone='0812345678';
  }
}
