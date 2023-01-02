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

  isAdmin = true;
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
  itemTransfer = {
    label: 'Chuyển khoản',
    iconName: PrimeIcons.SEND,
    route: '/transfer',
    idx: '1',
    items: [],
    parent: '0',
    isCollapsed: false,
  };
  itemTransactionHistory = {
    label: 'Lịch sử giao dịch',
    iconName: PrimeIcons.ALIGN_JUSTIFY,
    route: '/transaction-history',
    idx: '2',
    items: [],
    parent: '0',
    isCollapsed: false,
  };

  itemAccountFavorite = {
    label: 'Người thụ hưởng',
    iconName: PrimeIcons.HEART,
    route: '/account-favorite',
    idx: '3',
    parent: '0',
    isCollapsed: false,
    items: [],
  };

  itemPaymentForPartner = {
    label: 'Thanh toán',
    iconName: 'pi pi-credit-card',
    route: '/partner-payment',
    idx: '4',
    parent: '0',
    isCollapsed: false,
  };
  itemSetting = {
    label: 'Cài đặt',
    iconName: 'pi pi-cog',
    route: '/setting',
    idx: '8',
    items: [],
    parent: '0',
    isCollapsed: false,
  };
  itemTrademarkService = {
    label: 'Cài đặt',
    iconName: 'pi pi-cog',
    route: '',
    idx: '8',
    parent: '0',
    isCollapsed: false,
    items: [],
    // items: [
    //   {
    //     label: 'Thương hiệu & đối tác',
    //     iconName: '',
    //     route: '/trademark',
    //     items: [],
    //     idx: '8.1',
    //     parent: '0',
    //     className: 'item-child',
    //   },
    //   {
    //     label: 'Gói dịch vụ',
    //     iconName: '',
    //     route: '/service-pack',
    //     items: [],
    //     idx: '8.2',
    //     parent: '0',
    //     className: 'item-child',
    //   },
    // ],
  };
  // itemEmail = {
  //   label: 'Email',
  //   iconName: 'pi pi-envelope',
  //   route: '/email',
  //   idx: '5',
  //   items: [],
  //   parent: '0',
  //   isCollapsed: false,
  // };

  // itemPartnerList = {
  //   label: 'Hệ thống đối tác',
  //   iconName: 'pi pi-envelope',
  //   route: '/partner-referral',
  //   idx: '7',
  //   items: [],
  //   parent: '0',
  //   isCollapsed: false,
  // };
  @Input() items: $navItem[] = [];

  constructor(
    private ActivatedRoute: ActivatedRoute // private PlatformService: PlatformService
  ) {
    if (!!this.isAdmin) {
      this.items = [
        this.itemCustomerAccount,
        this.itemTransfer,
        this.itemTransactionHistory,
        this.itemAccountFavorite,
        // this.itemPaymentForPartner,
      ];
    } else {
      this.items = [
        this.itemCustomerAccount,
        // this.itemPartnerList,
        this.itemTransactionHistory,
        this.itemPaymentForPartner,
        // this.itemSetting,
      ];
    }
    // this.ActivatedRoute.url.subscribe((data) => {
    //   const selectedItem = "/" + get(data, "0.path", "");
    //   this.collapsed(selectedItem, "route");
    // });

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
