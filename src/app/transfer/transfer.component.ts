import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  transactionPaymentTypeList,
  TRANSACTION_PAYMENT_TYPE_PAID_SENDER,
  TRANSACTION_TYPE_RECEIVE,
  TRANSACTION_TYPE_SEND,
} from 'src/core/interface/transaction.interface';
import { CustomerService } from '../../core/services/customer.service';
import { SuggestAccountService } from '../../core/services/suggest-account.service';
import { OTPService } from '../../core/services/otp.service';
import { global } from '../../core/helper/global.shared';
import { objError, objSuccess } from 'src/core/interface/error.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [MessageService],
})
export class TransferComponent implements OnInit {
  customer: any;
  inputText = '';
  dataRes = [];
  lstSuggestAccount: any[] = [];
  selectedAccount: any | undefined;
  filteredAccount: any[] = [];
  optionPaymentType: any[] = transactionPaymentTypeList;
  selectedPayment: any | undefined;
  cantClick = true;
  loading = false;
  me = global.me;
  amount = 0;
  content: string = '';
  otpCode: string = '';
  cantClickOTP = true;
  isShowVerifyOtp = false;
  itemReceipt: any | undefined = {
    source: '',
    target: '',
    name: '',
    amount: '',
    content: '',
  };
  dataAccountBalanceSend: any | undefined;
  dataAccountBalanceReceive: any | undefined;
  dataTransactionSend: any | undefined;
  dataTransactionReceive: any | undefined;

  constructor(
    private CustomerService: CustomerService,
    private SuggestAccountService: SuggestAccountService,
    private OTPService: OTPService,
    private MessageService: MessageService,
    private Route: ActivatedRoute,
    private router: Router,
    private TransactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.getCustomer(this.me?.id);
    this.getListSuggestAccount();
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

  private getCustomer(id: any) {
    this.CustomerService.detail(id).subscribe((data: any) => {
      if (!data.error) {
        this.customer = data;
        const defaultContent = this.customer?.name + ' chuyen tien';
        this.content = defaultContent;
      }
    });
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

  changeOptionPaymentTypeData(selected: any) {
    const { value } = selected || {};
  }

  handleUpdateAccountBalance(id: number, data: any) {
    this.CustomerService.updateAccountBalance(id, data).subscribe(
      (data: any) => {
        if (!data.error) {
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  handleTransaction(data: any) {
    this.TransactionService.create(data).subscribe(
      (data) => {
        console.log('transaction success');
      },
      (error: HttpErrorResponse) => {},
      () => {}
    );
  }

  checkDisabledSave() {
    this.cantClick = this.amount > 0 && this.selectedAccount ? false : true;
  }

  formatData() {
    this.dataAccountBalanceSend = {
      amount: -this.amount,
    };

    this.dataAccountBalanceReceive = {
      amount: this.amount,
    };

    this.dataTransactionSend = {
      sendAccountNum: this.customer.id,
      receiveAccountNum: this.selectedAccount?.receiveSgtAcc?.id,
      receiveName: this.selectedAccount.name,
      amount: -this.amount,
      content: this.content,
      sendBankId: this.customer.bankId,
      receiveBankId: this.selectedAccount.bankId,
      paymentType: this.selectedPayment?.value,
      type: TRANSACTION_TYPE_SEND,
    };

    this.dataTransactionReceive = {
      sendAccountNum: this.customer.id,
      receiveAccountNum: this.selectedAccount?.receiveSgtAcc?.id,
      receiveName: this.selectedAccount.name,
      amount: this.amount,
      content: this.content,
      sendBankId: this.customer.bankId,
      receiveBankId: this.selectedAccount.bankId,
      paymentType: this.selectedPayment?.value,
      type: TRANSACTION_TYPE_RECEIVE,
    };

    this.itemReceipt = {
      source: this.customer.accountNum,
      target: this.selectedAccount?.receiveSgtAcc?.accountNum,
      name: this.selectedAccount?.receiveSgtAcc?.name,
      amount: this.amount,
      content: this.content,
    };
  }

  verifyOtp() {
    this.loading = true;
    this.OTPService.verifyOTP({
      cId: this.customer.id,
      code: this.otpCode,
    }).subscribe(
      (data: any) => {
        if (!data.error) {
        }
      },
      (error: HttpErrorResponse) => {
        this.MessageService.addAll([objError]);
        this.loading = false;
      },
      () => {
        this.handleUpdateAccountBalance(
          this.customer?.id,
          this.dataAccountBalanceSend
        );
        this.handleUpdateAccountBalance(
          this.selectedAccount.receiveSgtAcc.id,
          this.dataAccountBalanceReceive
        );
        this.handleTransaction(this.dataTransactionSend);
        this.handleTransaction(this.dataTransactionReceive);
        setTimeout(() => this.router.navigate(['/transaction-history']), 3000);
        this.loading = false;
      }
    );
  }

  requestOtp() {
    this.formatData();
    this.loading = true;
    this.OTPService.create({ id: this.customer.id }).subscribe(
      (data: any) => {
        if (!data.error) {
          this.isShowVerifyOtp = true;
          this.MessageService.addAll([objSuccess]);
        }
      },
      (error: HttpErrorResponse) => {
        this.MessageService.addAll([objError]);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  checkDisabledTransfer() {
    this.cantClickOTP = this.otpCode ? false : true;
  }
}
