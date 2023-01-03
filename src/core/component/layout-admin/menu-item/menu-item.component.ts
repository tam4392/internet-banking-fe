// import get from "lodash/get";
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { global } from "@core/shared/global.shared";
// import { PlatformService } from "@core/services/platform.service";
import { Subscription } from 'rxjs';
import { get } from 'lodash';
import { MenuItem, PrimeIcons } from 'primeng/api';

export interface $navItem {
  label?: string;
  iconName?: string;
  icon?: string;
  route?: string;
  alias?: string;
  items?: $navItem[];
  isCollapsed?: boolean;
  idx?: string;
  parent?: string;
  className?: string;
  active?: boolean;
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() isCollapsedSideBar = false;
  @Output() handleCollapsedS: EventEmitter<boolean> = new EventEmitter();

  isAdmin = false;
  //   isPartner = global.isPartner;
  //   orgId = global.me?.orgId;
  //   logo = global.org?.logo
  //   platNameShop = global.org?.nameShop;
  //   platPhone = global.org?.phone;
  //   platEmail = global.org?.emailRoot;

  itemCustomerAccount = {
    label: 'Tài khoản',
    iconName: PrimeIcons.USER,
    route: '',
    alias: 'home',
    idx: '0',
    items: [],
    parent: '0',
    isCollapsed: false,
  };

  itemCustomerTransfer = {
    label: 'Chuyển khoản',
    iconName: PrimeIcons.SEND,
    route: '/transfer',
    idx: '1',
    items: [],
    parent: '0',
    isCollapsed: false,
  };

  itemCustomerTransactionHistory = {
    label: 'Lịch sử giao dịch',
    iconName: PrimeIcons.ALIGN_JUSTIFY,
    route: '/transaction-history',
    idx: '2',
    items: [],
    parent: '0',
    isCollapsed: false,
  };

  itemCustomerAccountFavorite = {
    label: 'Người thụ hưởng',
    iconName: PrimeIcons.HEART,
    route: '/account-favorite',
    idx: '3',
    parent: '0',
    isCollapsed: false,
    items: [],
  };

  itemCustomerDebtReminder = {
    label: 'Quản lý nhắc nợ',
    iconName: PrimeIcons.WALLET,
    route: '/debt-reminder',
    idx: '4',
    parent: '0',
    isCollapsed: false,
    items: [],
  };

  itemEmployeeCreateAccount = {
    label: 'Tạo tài khoản khách hàng',
    iconName: PrimeIcons.USER_PLUS,
    route: '/employee-create-account',
    idx: '5',
    parent: '0',
    isCollapsed: false,
  };

  itemEmployeeDepositMoney = {
    label: 'Nạp tiền',
    iconName: PrimeIcons.DOLLAR,
    route: '/employee-deposit-money',
    idx: '6',
    parent: '0',
    isCollapsed: false,
  };

  itemEmployeeTransactionHistory = {
    label: 'Lịch sử giao dịch',
    iconName: PrimeIcons.CHART_BAR,
    route: '/employee-history-transaction',
    idx: '7',
    parent: '0',
    isCollapsed: false,
  };

  itemAdminManageEmployee = {
    label: 'Lịch sử giao dịch',
    iconName: PrimeIcons.USERS,
    route: '/manage-employee',
    idx: '8',
    parent: '0',
    isCollapsed: false,
  };

  itemAdminManageForControl = {
    label: 'Đối soát',
    iconName: PrimeIcons.CHART_LINE,
    route: '/manage-for-control',
    idx: '9',
    parent: '0',
    isCollapsed: false,
  };

  @Input() items: $navItem[] = [];

  constructor(
    private ActivatedRoute: ActivatedRoute // private PlatformService: PlatformService
  ) {
    if (!!this.isAdmin) {
      this.items = [
        this.itemEmployeeCreateAccount,
        this.itemEmployeeDepositMoney,
        this.itemEmployeeTransactionHistory,
      ];
    } else {
      this.items = [
        this.itemCustomerAccount,
        this.itemCustomerTransfer,
        this.itemCustomerTransactionHistory,
        this.itemCustomerAccountFavorite,
        this.itemCustomerDebtReminder,
      ];
    }

    this.ActivatedRoute.url.subscribe((data) => {
      const selectedItem = '/' + get(data, '0.path', '');
      this.collapsed(selectedItem, 'route');
    });

    // const Subscription: Subscription = this.PlatformService.detail(
    //   this.orgId
    // ).subscribe(
    //   (data) => {
    //     if (data.error) {
    //     }
    //     const res = data?.data || {};
    //     debugger;

    //   },
    //   (error) => {
    //   },
    //   () => {
    //     Subscription.unsubscribe();
    //   }
    // );
  }

  private collapsed(data: string, ele: any) {
    this.items.forEach((item) => {
      const val = get(item, ele, '');
      if (val === String(data)) {
        item.isCollapsed = !item.isCollapsed;
      } else {
        item.isCollapsed = false;
      }
      if (item.items && item.items.length > 0 && String(data) !== '/') {
        const index = item.items.findIndex((obj) =>
          obj.route?.includes(String(data))
        );
        if (index !== -1) {
          item.isCollapsed = !item.isCollapsed;
          item.items[index].active = true;
        }
      }
      return item;
    });
  }

  ngOnInit(): void {}

  handleCollapsed(idx: any) {
    this.collapsed(idx, 'idx');
  }

  //   handleCollapsedSidebar() {
  //     this.handleCollapsedS.emit(!this.isCollapsedSideBar);
  //   }
}
