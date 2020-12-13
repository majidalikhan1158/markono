import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-spec-unit-price',
  templateUrl: './spec-unit-price.component.html',
  styleUrls: ['./spec-unit-price.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecUnitPriceComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Offset Selling Price",
          data: [2.5, 3.2, 5.5, 6.8, 7.5]
        },
        {
          name: "Digital",
          data: [4, 4, 4, 4, 4]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 25,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#83bfe8", "#ffba31"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Unit Selling Price",
        align: "center"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["", "200", "400", "600", "1000"],
        title: {
          text: ""
        }
      },
      yaxis: {
        title: {
          text: ""
        },
        min: 0.00,
        max: 8.00
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        floating: true,
        offsetY: 10,
        offsetX: -5
      }
    };
  }
  ngOnInit() {

  }

}
