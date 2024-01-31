import { CategoryService } from 'src/app/core/services/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Panel } from 'primeng/panel';
import { monthList, yearList } from 'src/app/shared/utils/utils';
import currencyFormatter from 'currency-formatter';
import { Category } from 'src/app/core/models/category.model';
import { Entry, EntryType } from 'src/app/core/models/entry.model';
import { EntryService } from 'src/app/core/services/entry.service';

@Component({
  selector: 'app-chart-overview',
  templateUrl: './chart-overview.component.html',
  styleUrls: ['./chart-overview.component.css'],
})
export class ChartOverviewComponent implements OnInit {
  public monthList: any[] = [];
  public yearList: any[] = [];
  public tagList: string[] = [];
  public filterForm: FormGroup;
  public isCollapsed = true;

  public expenseTotal = 0;
  public revenueTotal = 0;
  public balance = 0;

  public expenseChart: any;
  public revenueChart: any;
  public chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  public categories: Category[] = [];
  public entries: Entry[] = [];

  @ViewChild('filterPanel') filterPanel: Panel;

  constructor(
    private fb: FormBuilder,
    private entryService: EntryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.monthList = monthList();
    this.yearList = yearList();
    this.createForm();
    this.getCategories();
  }

  public resetFilter(): void {
    this.filterForm.reset();
    this.tagList = [];
  }

  public filter(): void {
    this.resetReports();
    this.isCollapsed = true;
    this.tagList = [];
    this.generateReports();
    const filters = this.filterForm.getRawValue();

    Object.keys(filters).forEach((name) => {
      const value = filters[name];
      if (value) {
        this.tagList.push(this.setFilterLabel(name, value.name));
      }
    });
  }

  public generateReports(): void {
    const { month, year } = this.filterForm.getRawValue();
    this.entryService
      .getByMonthAndYear(month.value, year.value)
      .subscribe((data) => {
        this.entries = data;
        this.calcBalance();
        this.setCharts();
      });
  }

  private resetReports(): void {
    this.expenseTotal = 0;
    this.revenueTotal = 0;
    this.balance = 0;
    this.expenseChart = [];
    this.revenueChart = [];
  }

  private calcBalance(): void {
    const revenueTotal = this.entries
      .filter((el) => el.type === EntryType.Receita)
      .reduce(
        (total, entry) =>
          total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }),
        this.revenueTotal
      );
    const expenseTotal = this.entries
      .filter((el) => el.type === EntryType.Despesa)
      .reduce(
        (total, entry) =>
          total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }),
        this.expenseTotal
      );

    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {
      code: 'BRL',
    });
  }

  private setCharts(): void {
    this.revenueChart = this.getChart(EntryType.Receita, 'Receitas', '#2a9d8f');
    this.expenseChart = this.getChart(EntryType.Despesa, 'Despesas', '#ad2831');
  }

  private getChart(type: EntryType, title: string, color: string): any {
    const chartData = [];

    this.categories.forEach((category) => {
      const entries = this.entries.filter(
        (entry) => entry.category.id === category.id && entry.type === type
      );

      if (entries.length) {
        const totalAmount = entries.reduce(
          (total, entry) =>
            total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }),
          0
        );
        chartData.push({
          categoryName: category.name,
          totalAmount,
        });
      }
    });
    return {
      labels: chartData.map((item) => item.categoryName),
      datasets: [
        {
          label: title,
          backgroundColor: color,
          data: chartData.map((item) => item.totalAmount),
        },
      ],
    };
  }

  private setFilterLabel(fieldName: string, fieldValue: string): string {
    switch (fieldName) {
      case 'month':
        return `Mês - ${fieldValue}`;
      case 'year':
        return `Ano - ${fieldValue}`;
      default:
        return fieldValue.toString();
    }
  }

  private createForm(): void {
    this.filterForm = this.fb.group({
      month: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  private getCategories(): void {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }
}
