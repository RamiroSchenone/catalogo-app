import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menu: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    // this.homeService.getHome().subscribe((res) => {
    //   this.menu = res;
    // });
  }

  // redirect(redirectTo: string){
  //   this.router.navigateByUrl(`home/${redirectTo}`);
  // }
}
