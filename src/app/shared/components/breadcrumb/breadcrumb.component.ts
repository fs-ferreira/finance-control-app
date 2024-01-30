import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  static ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  bcItems: MenuItem[];
  home: MenuItem;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () => (this.bcItems = this.createBreadcrumbs(this.activatedRoute.root))
      );
  }
  
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '#',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

        if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label =
        child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (label) {
        breadcrumbs.push({ label, url });
      }      
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
