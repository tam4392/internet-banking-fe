import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
