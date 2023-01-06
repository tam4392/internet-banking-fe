import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { global } from '../../helper/global.shared';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss'],
  providers: [MessageService],
})
export class LayoutAdminComponent implements OnInit {
  height = 0;
  isFullScreen = false;
  isCollapsedSideBar = true;
  me = global.me;

  constructor(private router: Router) {
    this.height = window.innerHeight - 9;
    if (window.outerWidth <= 1030) this.isFullScreen = true;
    else this.isFullScreen = false;
  }

  ngOnInit() {}
}
