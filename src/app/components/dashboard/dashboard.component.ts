import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-item.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  menu: MenuItem[];

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe((res) => {
      this.menu = res;
    });
  }

  redirect(redirectTo: string){
    this.router.navigateByUrl(`dashboard/${redirectTo}`);
  }
}
