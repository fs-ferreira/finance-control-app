import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'finance-control-app';

  items: MenuItem[];

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
}
