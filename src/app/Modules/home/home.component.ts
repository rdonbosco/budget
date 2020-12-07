import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BudgetService } from 'src/app/Services/http/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public UserData = JSON.parse(localStorage.getItem('UserData'));

  public BudgetList = [];
  public month = [ 'January ', 'February ', 'March ', 'April ', 'May ', 'June ', 'July ',
             'August ', 'September ', 'October ', 'November ', 'December '];
  public today = new Date();
  public SelectMonth = this.today.getMonth() + 1;
  public SelectYear = this.today.getFullYear();

  constructor(private budgetService: BudgetService) { }

  // Pie start
  public pieChartAllocationLabels = [];
  public pieChartSpentLabels = [];
  public pieChartAllocationToolTipLabels = [];
  public pieChartSpentToolTipLabels = [];
  public pieChartAllocationData = [];
  public pieChartSpentData = [];
  public pieChartType = 'pie';
  public pieChartColors = [];
  public pieChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return localStorage.getItem('PieHover') + ' : ' + data.datasets[0].data[tooltipItems.index];
        }
      }
    },
  };
  // Pie end

   // Doughnut start
   public doughnutChartLabels = [];
   public doughnutChartAllocationToolTipLabels = [];
   public doughnutChartSpentToolTipLabels = [];
   public doughnutAllocationChartData = [];
   public doughnutSpentChartData = [];
   public doughnutChartType = 'doughnut';
   public doughnutChartColors = [];
   public doughnutChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return localStorage.getItem('DoughnutHover') + ' : ' + data.datasets[0].data[tooltipItems.index];
        }
      }
    },
  };
   // Doughnut end

  // BarChart start
  public barChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ticks: { beginAtZero: true }}] },
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barchartAllocationData = [];
  public barchartSpentData = []; 
  public barChartData = [];
  // BarChart end

  // LineChart start
  public linechartAllocationData = [];
  public linechartSpentData = [];
  public lineChartData = [];
  public lineChartLabels = [];
  public lineChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ticks: { beginAtZero: true }}] },
  };
  public lineChartColors = [

    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  // LineChart end

  ngOnInit(): void {
    this.get();
    this.getfilter();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  get() {
    this.budgetService.GetBudget()
      .subscribe(
          (data: any) => {
            this.BudgetList = data['data'];
            const self = this;
            this.BudgetList.filter(function (x) {
              x.month = self.month[x.month - 1].trim();
            });
          },
          error => {
          });
  }

  getfilter(){
    let param = {
      userid: this.UserData.userId,
      year: this.SelectYear,
      month: this.SelectMonth
    };
    this.budgetService.GetBudgetFilter(param)
    .subscribe(
        (data: any) => {
          const BudgetList = data['data'];
          const self = this;
          const ColorCodes = [];
          const ColorCodes1 = [];
          self.pieChartAllocationData = [];
          self.pieChartAllocationToolTipLabels = [];
          self.pieChartSpentToolTipLabels = [];
          self.pieChartAllocationLabels = [];
          self.pieChartSpentLabels = [];
          self.pieChartSpentData = [];

          self.doughnutAllocationChartData = [];
          self.doughnutChartLabels = [];
          self.doughnutChartLabels = [];
          self.doughnutChartAllocationToolTipLabels = [];
          self.doughnutChartSpentToolTipLabels = [];
          self.doughnutSpentChartData = [];

          self.barChartLabels = [];
          self.barchartAllocationData = [];
          self.barchartSpentData = [];

          self.linechartAllocationData = [];
          self.linechartSpentData = [];
          self.lineChartLabels = [];
          BudgetList.filter(function (x) {
            self.pieChartAllocationData.push(x.allocation);
            x.month = self.month[x.month - 1].trim();
            self.pieChartAllocationToolTipLabels.push(' allocation of ' + x.month + ' ' + x.year);
            self.pieChartSpentToolTipLabels.push(' spent of ' + x.month + ' ' + x.year);
            self.pieChartAllocationLabels.push(x.type);
            self.pieChartSpentLabels.push(x.type);
            self.pieChartSpentData.push(x.spent);

            self.doughnutAllocationChartData.push(x.allocation);
            self.doughnutSpentChartData.push(x.spent);
            self.doughnutChartLabels.push(x.type);
            self.doughnutChartAllocationToolTipLabels.push(' allocation of ' + x.month + ' ' + x.year);
            self.doughnutChartSpentToolTipLabels.push(' spent of ' + x.month + ' ' + x.year);

            self.barChartLabels.push(x.type);
            self.barchartAllocationData.push(x.allocation);
            self.barchartSpentData.push(x.spent);

            self.linechartAllocationData.push(x.allocation);
            self.linechartSpentData.push(x.spent);
            self.lineChartLabels.push(x.type);

            ColorCodes.push(self.getRandomColor());
            ColorCodes1.push(self.getRandomColor());
          });
          self.pieChartColors = [
            {
              backgroundColor: ColorCodes,
            },
          ];
          self.doughnutChartColors = [
            {
              backgroundColor: ColorCodes1,
            },
          ];
          self.barChartData = [
            { data: this.barchartAllocationData, label: 'Allocation' },
            { data: this.barchartSpentData, label: 'Spent' }
          ];
          self.lineChartData = [
            { data: this.linechartAllocationData, label: 'Allocation' },
            { data: this.linechartSpentData, label: 'Spent' }
          ];
        },
        error => {
        });
  }

  chartAllocationHovered(e: any): void {
    localStorage.setItem('PieHover', e.active[0]._model.label + this.pieChartAllocationToolTipLabels[e.active[0]._index]);
  }

  chartSpentHovered(e: any): void {
    localStorage.setItem('PieHover', e.active[0]._model.label + this.pieChartSpentToolTipLabels[e.active[0]._index]);
  }

  DoughnutchartAllocationHovered(e: any): void {
    localStorage.setItem('DoughnutHover', e.active[0]._model.label + this.doughnutChartAllocationToolTipLabels[e.active[0]._index]);
  }

  DoughnutchartSpentHovered(e: any): void {
    localStorage.setItem('DoughnutHover', e.active[0]._model.label + this.doughnutChartSpentToolTipLabels[e.active[0]._index]);
  }


}
