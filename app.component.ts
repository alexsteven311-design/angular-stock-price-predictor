import { Component } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  template: `
    <h2>📈 Stock Price Predictor</h2>

    <form (ngSubmit)="onSubmit()" class="form">
      <input [(ngModel)]="ticker" name="ticker" placeholder="Ticker (e.g., AAPL)" required>
      <input [(ngModel)]="days" name="days" type="number" min="1" placeholder="Days" required>
      <button type="submit">Predict</button>
    </form>

    <ngx-charts-line-chart
      *ngIf="data.length"
      [view]="[700, 300]"
      [scheme]="colorScheme"
      [results]="chartData"
      [xAxis]="true"
      [yAxis]="true"
      [legend]="false"
      [showXAxisLabel]="true"
      [showYAxisLabel]="true"
      [xAxisLabel]="'Date'"
      [yAxisLabel]="'Price (USD)'"
      [autoScale]="true">
    </ngx-charts-line-chart>
  `,
  styles: [`
    .form { margin-bottom: 20px; }
    input { margin-right: 10px; padding: 6px; }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  ticker = 'AAPL';
  days = 5;
  data: any[] = [];

  // ✅ Fix here
  colorScheme: Color = {
    name: 'blueScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1f77b4']
  };

  constructor(private stockService: StockService) {}

  get chartData() {
    return [{
      name: 'Predicted Price',
      series: this.data.map((v: any) => ({
        name: v.date,
        value: v.price
      }))
    }];
  }

  onSubmit() {
    this.stockService.predict(this.ticker, this.days).subscribe(res => {
      this.data = res.dates.map((date: string, idx: number) => ({
        date,
        price: res.prices[idx]
      }));
    });
  }
}
