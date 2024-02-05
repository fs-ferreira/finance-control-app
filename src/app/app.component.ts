import { Component, OnInit } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { MenuItem } from 'primeng/api';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'finance-control-app';
  iconTheme = faSun;

  items: MenuItem[];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Relatórios',
        routerLink: 'reports',
      },
      {
        label: 'Lançamentos',
        routerLink: 'entries',
      },
      {
        label: 'Categorias',
        routerLink: 'categories',
      },
    ];
  }

  public changeTheme(): void {
    if (this.iconTheme === faSun) {
      this.iconTheme = faMoon;
      this.themeService.switchTheme('arya-blue', '#0b090a');
    } else {
      this.iconTheme = faSun;
      this.themeService.switchTheme('saga-blue', 'white');
    }
  }
}
