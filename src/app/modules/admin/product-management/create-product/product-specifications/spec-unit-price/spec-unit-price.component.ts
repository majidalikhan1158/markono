import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
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
} from 'ng-apexcharts';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { UnitPriceVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from '../../../../../shared/ui-services/product-spec.service';

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
export class SpecUnitPriceComponent implements OnInit, OnDestroy {

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  viewModal: UnitPriceVM;
  constructor(private store: ProductSpecStore) {
  }

  ngOnInit() {
    this.getDefaultRecord();
    this.initializeChart();
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.unitPriceVM && resp.unitPriceVM.id > 0) {
        this.viewModal = resp.unitPriceVM;
      } else {
        this.viewModal = this.initialObject();
      }
    });
  }

  initialObject = (): UnitPriceVM => {
    return {
      id: 1,
      fixedPrice: 0,
      priceType: ''
    };
  }

  initializeChart = () => {
    this.chartOptions = {
      series: [
        {
          name: 'Offset Selling Price',
          data: [2.5, 3.2, 5.5, 6.8, 7.5]
        },
        {
          name: 'Digital',
          data: [4, 4, 4, 4, 4]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 25,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#83bfe8', '#ffba31'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Unit Selling Price',
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['', '200', '400', '600', '1000'],
        title: {
          text: ''
        }
      },
      yaxis: {
        title: {
          text: ''
        },
        min: 0.00,
        max: 8.00
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: true,
        offsetY: 10,
        offsetX: -5
      }
    };
  }

  handleUnitPriceChange = () => {
    this.saveToStore();
  }

  saveToStore = () => {
    console.log(this.viewModal);
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.UNIT_PRICE
    );
  }

  ngOnDestroy(): void {
    this.saveToStore();
  }
}
