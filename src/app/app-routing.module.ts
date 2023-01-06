import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationEmployeeComponent } from './authentication-employee/authentication-employee.component';
import { EmployeeLoginComponent } from './authentication-employee/login/employee-login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CustomerLoginComponent } from './authentication/login/customer-login.component';
import { EmployeeDepositMoneyTransferComponent } from './employee-deposit-money-transfer/employee-deposit-money-transfer.component';
import { EmployeeDepositMoneyComponent } from './employee-deposit-money/employee-deposit-money.component';
import { HomeComponent } from './home/home.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { SuggestAccountComponent } from './suggest-account/suggest-account.component';
import { TransferComponent } from './transfer/transfer.component';
import { EmployeeHistoryTransactionComponent } from './employee-history-transaction/employee-history-transaction.component';
import { DebtReminderComponent } from './debt-reminder/debt-reminder.component';
import { DebtReminderListComponent } from './debt-reminder/list/debt-reminder-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'authentication-employee',
    component: AuthenticationEmployeeComponent,
    children: [
      { path: 'login', component: EmployeeLoginComponent, data: { test: 1 } },
      { path: '**', redirectTo: '' },
    ],
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: CustomerLoginComponent, data: { test: 1 } },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: 'employee-deposit-money', component: EmployeeDepositMoneyComponent },
  {
    path: 'employee-deposit-money/:id',
    component: EmployeeDepositMoneyTransferComponent,
  },
  {
    path: 'employee-history-transaction',
    component: EmployeeHistoryTransactionComponent,
  },
  { path: 'transfer', component: TransferComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: 'suggest-account', component: SuggestAccountComponent },
  {
    path: 'debt-reminder',
    component: DebtReminderComponent,
    children: [
      { path: '', component: DebtReminderListComponent },
      // {
      //   path: 'new',
      //   component: CampaignNewComponent,
      // },
      // { path: ':id', component: CampaignUpdateComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
