import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { global } from 'src/core/helper/global.shared';
import { SuggestAccountService } from '../../core/services/suggest-account.service';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-suggest-account',
  templateUrl: './suggest-account.component.html',
  styleUrls: ['./suggest-account.component.scss'],
})
export class SuggestAccountComponent implements OnInit {
  search = '';
  inputText = '';
  lstSuggestAccount: any[] = [];
  cols: any[] = [];
  first = 0;

  reset() {
    this.first = 0;
  }

  constructor(private SuggestAccountService: SuggestAccountService) {}

  ngOnInit(): void {
    this.getlstSuggestAccount({}, global.me.id);
    this.cols = [
      { field: 'col1', header: 'Tên người hưởng thụ' },
      { field: 'col2', header: 'Tài khoản hưởng thụ' },
      { field: 'col3', header: 'Đơn vị hưởng thụ' },
    ];
  }

  private getlstSuggestAccount(filter: any, id: string) {
    this.SuggestAccountService.getSuggestAccountById(id).subscribe(
      (data: any) => {
        if (!data.error) {
          this.lstSuggestAccount = data;
        }
      }
    );
  }

  delete(id: string) {
    this.SuggestAccountService.delete(id).subscribe(() => {
      this.getlstSuggestAccount(this.lstSuggestAccount, global.me.id);
    });
  }
}
