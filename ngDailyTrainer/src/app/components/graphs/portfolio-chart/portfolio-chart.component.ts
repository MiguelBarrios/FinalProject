
import { TradesService } from 'src/app/services/trades.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Trade } from 'src/app/models/trade';
import { AccountHomeComponent } from '../../page-components/account-home/account-home.component';

@Component({
  selector: 'app-portfolio-chart',
  templateUrl: './portfolio-chart.component.html',
  styleUrls: ['./portfolio-chart.component.css']
})
export class PortfolioChartComponent implements OnInit {
  ngOnInit(): void {
    this.refreshChartData();
  }

   userTrades:Trade[]= [];

  constructor(private tradesService: TradesService, private accountComponent:AccountHomeComponent){
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [ {
      data: []
    } ]
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }
    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  refreshChartData(): void{
    this.tradesService.getUserPositions().subscribe(
      (data) => {
        for(let position of data){
          this.pieChartData.datasets[0].data.push(position.avgCostPerShare * position.numberOfShares);
          if(this.pieChartData.labels){
            this.pieChartData.labels.push([position.symbol]);
          }
        }

        this.pieChartData.datasets[0].data.push(parseFloat(this.accountComponent.userBalance));
        if(this.pieChartData.labels){
          this.pieChartData.labels.push(["Cash"]);
        }
        this.chart?.update();
      },
      (error) => {
        console.log("Observable got and error " + error)
      }
    )
  }

}

