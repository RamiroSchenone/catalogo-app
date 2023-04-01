import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MenuService } from './services/menu.service';
import { MenuItem } from './models/menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuItems: MenuItem[];
  title = 'catalogo-app';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private menuService: MenuService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.menuService.getAll().subscribe((data) => this.menuItems = data);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
