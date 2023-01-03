import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationEmployeeComponent } from './authentication-employee/authentication-employee.component';
import { EmployeeLoginComponent } from './authentication-employee/login/employee-login.component';
import { HomeComponent } from './home/home.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferComponent } from './transfer/transfer.component';

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

  { path: 'transfer', component: TransferComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
