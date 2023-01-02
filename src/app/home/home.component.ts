import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
