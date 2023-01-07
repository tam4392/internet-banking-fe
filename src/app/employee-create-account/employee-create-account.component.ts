import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { objError, objSuccess } from 'src/core/interface/error.interface';
import { CustomerService } from '../../core/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-create-account',
  templateUrl: './employee-create-account.component.html',
  styleUrls: ['./employee-create-account.component.scss'],
  providers: [MessageService],
})
export class EmployeeCreateAccountComponent implements OnInit {
  insertCustomer: any;
  selectedCustomer: any;
  lstCustomer: any[] = [];
  msgs : MessageService[]=[];

  display: boolean = false;
  cantClick = true;
  loading = false;
  totalCount = 0;

  constructor(
    private CustomerService: CustomerService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private Route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.insertCustomer= this.initCust();
  }

  initCust(){
    return {
      userName: "user012",
      password: "123456",
      email: "nguyen-a@email.com",
      address: "",
      name: "Nguyễn Văn A",
      accountBalance: 150000,
      dob: "1995-02-02",
      bankId: null,
    }
  }

  formatData() {
    return {
      userName: this.insertCustomer.userName,
      password: this.insertCustomer.password,
      email: this.insertCustomer.email,
      address: this.insertCustomer.address,
      name: this.insertCustomer.name,
      accountBalance: this.insertCustomer.accountBalance,
      dob: this.insertCustomer.dob,
      bankId: 1,
    };
  }

  insertAccount() {
    this.loading = true;
    this.CustomerService.insert(this.formatData()).subscribe(
      (data: any) => {
        console.log(data);
        if (!data.error) {
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.messageService.addAll([objError]);
      
        this.loading = false;
      },
      () => {
        this.display = false;
        this.insertCustomer = this.initCust();
      }
    );
  }

  showDialog() {
    this.display = true;
  }
  hideDialog() {
    this.display = false;
    // this.insertCustomer = this.initCust;
  }
}
