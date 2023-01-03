import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutAdminComponent } from 'src/core/component/layout-admin/layout-admin.component';
import { MenuItemComponent } from 'src/core/component/layout-admin/menu-item/menu-item.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BadgeModule } from 'primeng/badge';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { HomeComponent } from './home/home.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { EmployeeLoginComponent } from './authentication-employee/login/employee-login.component';
import { AuthenticationEmployeeComponent } from './authentication-employee/authentication-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutAdminComponent,
    MenuItemComponent,
    AuthenticationEmployeeComponent,
    EmployeeLoginComponent,
    HomeComponent,
    TransferComponent,
    TransactionHistoryComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    InputTextModule,
    BrowserAnimationsModule,
    FormsModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ProgressSpinnerModule,
    StepsModule,
    ToastModule,
    AvatarModule,
    TabViewModule,
    DividerModule,
    InputSwitchModule,
    DialogModule,
    SkeletonModule,
    TooltipModule,
    CalendarModule,
    OverlayPanelModule,
    InputNumberModule,
    DynamicDialogModule,
    SidebarModule,
    SelectButtonModule,
    TableModule,
    TagModule,
    RadioButtonModule,
    BadgeModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ImageModule,
    PanelModule,
    CarouselModule,
    AutoCompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
