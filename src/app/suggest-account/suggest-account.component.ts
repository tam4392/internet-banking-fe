import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SuggestAccountService } from '../../core/services/suggest-account.service';

@Component({
  selector: 'app-suggest-account',
  templateUrl: './suggest-account.component.html',
  styleUrls: ['./suggest-account.component.scss'],
})

export class SuggestAccountComponent implements OnInit {
  //   isAdmin = false;
  //   isPartner = false;
  search = '';
  inputText = '';
  nguoithuhuong = 'Nguyễn Hoàng Long';
  lstSuggestAccount: any[] = [];
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
  suggestAccount = [
    { check: false, name: "ĐỖ THỊ KIM ANH", numberAccount: "622704060213553", nameBank: "VIB - NH TMCP QUOC TE VIET..." },
    { check: false, name: "LE THAI NGOC", numberAccount: "9704031173322046", nameBank: "VIB - NH TMCP QUOC TE VIET..." },
    { check: false, name: "LE VAN TRAN HUY", numberAccount: "1140107011994", nameBank: "1140107011994	MB - NH TMCP QUAN DOI (MIL..." },
    { check: false, name: "NGUYỄN HUỲNH ANH VŨ", numberAccount: "622704060221524", nameBank: "VIB - NH TMCP QUOC TE VIET..." }
  ];

  constructor(private SuggestAccountService: SuggestAccountService) {
    // this.isAdmin = global.isAdmin;
    // this.isPartner = global.isPartner;
  }

  ngOnInit(): void {
    this.getlstSuggestAccount({});
  }

  private getlstSuggestAccount(filter: any) {
    this.SuggestAccountService.get(filter).subscribe((data: any) => {
      if (!data.error) {
        this.lstSuggestAccount = data;
      }
    });
  }
}
