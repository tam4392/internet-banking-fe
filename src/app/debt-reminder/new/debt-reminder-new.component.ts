import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DebitService } from '../../../core/services/debit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../../../core/helper/global.shared';
import { HttpErrorResponse } from '@angular/common/http';
import {
  debitStatusList,
  debitTypeList,
} from 'src/core/interface/debit.interface';
import { SuggestAccountService } from '../../../core/services/suggest-account.service';
import { objError, objSuccess } from 'src/core/interface/error.interface';

@Component({
  selector: 'app-debt-reminder-new',
  templateUrl: './debt-reminder-new.component.html',
  styleUrls: ['./debt-reminder-new.component.scss'],
  providers: [MessageService],
})
export class DebtReminderNewComponent implements OnInit {
  lstDebit = [];
  totalCount = 0;
  me = global.me;
  lstSuggestAccount: any[] = [];
  selectedAccount: any | undefined;
  filteredAccount: any[] = [];
  cantClick = true;
  amount = 0;
  dateRemind: any | undefined;
  optionType: any[] = debitTypeList;
  selectedOption: any | undefined;
  content = '';
  loading = false;

  constructor(
    private DebitService: DebitService,
    private SuggestAccountService: SuggestAccountService,
    private messageService: MessageService,
    private Route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListSuggestAccount();
  }

  private getListSuggestAccount() {
    this.SuggestAccountService.getSuggestAccountById(this.me?.id).subscribe(
      (data: any) => {
        if (!data.error) {
          this.lstSuggestAccount = data;
        }
      }
    );
  }

  filterChoose(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.lstSuggestAccount.length; i++) {
      let country = this.lstSuggestAccount[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredAccount = filtered;
  }

  getCreateDebit() {
    const data = {
      sourceAccountId: this.me.id,
      targetAccountId: this.selectedAccount?.receiveSgtAcc?.id,
      amount: this.amount,
      content: this.content,
      dateRemind: new Date(this.dateRemind).toISOString(),
      type: 1,
      createdBy: 2,
    };
    this.loading = true;
    this.DebitService.create(data).subscribe(
      (data) => {
        this.messageService.addAll([objSuccess]);
        this.loading = false;
        setTimeout(() => this.router.navigate(['/debt-reminder']), 200);
      },
      (error: HttpErrorResponse) => {
        this.messageService.addAll([objError]);
        this.loading = false;
      },
      () => {}
    );
  }

  getDebitType(type: any) {
    const itemType = debitTypeList.find((obj) => obj.value === Number(type));
    return itemType?.text;
  }

  getDebitStatus(status: any) {
    const itemType = debitStatusList.find(
      (obj) => obj.value === Number(status)
    );
    return itemType?.text;
  }

  checkDisabledSave() {
    this.cantClick = this.amount > 0 && this.selectedAccount ? false : true;
  }
}
