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

@Component({
  selector: 'app-debt-reminder-list',
  templateUrl: './debt-reminder-list.component.html',
  styleUrls: ['./debt-reminder-list.component.scss'],
  providers: [MessageService],
})
export class DebtReminderListComponent implements OnInit {
  lstDebit = [];
  totalCount = 0;
  me = global.me;

  constructor(
    private DebitService: DebitService,
    private messageService: MessageService,
    private Route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListDebitByMe();
  }

  getListDebitByMe() {
    this.DebitService.get({ createdBy: this.me.id }).subscribe(
      (data) => {
        this.lstDebit = data.data;
        this.totalCount = data.totalCount;
        console.log(data);
      },
      (error: HttpErrorResponse) => {},
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
}
