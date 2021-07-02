import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { StatusTypesArray } from 'src/app/modules/shared/models/order-management';
import { OrderSearchFilterTypes, PlanningSearchFilters, PrintTypes } from 'src/app/modules/shared/models/table-filter-modals';
import { AppPageRoutes } from '../../../shared/enums/app-constants';
import { PlanningCaseDetail } from '../../../shared/models/order-management';

@Component({
  selector: 'app-planning-list',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right', 'after'];
  position = new FormControl(this.positionOptions[4]);
  displayedColumns: string[] = ['id', 'caseNo', 'orderDate', 'requestedDeliveryDate', 'qty', 'printType',
  'type', 'currentActivityStatusCode', 'actions'];
  dataSource;
  tableFilters: PlanningSearchFilters;
  tableFilterTypes = OrderSearchFilterTypes;
  printTypes = PrintTypes;
  selectedPrintType = '';
  globalFilter = '';
  statusTypesList = StatusTypesArray;
  rowIdToExpand = 0;
  chooseList = '';
  viewByFilter = '';
  subscription: Subscription;
  isLoading = true;
  jobNoSearch = '';
  planningList: PlanningCaseDetail[] = [];
  totalRecord = 10;
  pageIndex = 0;
  pageSize = 10;
  isNodata = false;
  totalRecordListSubscription: Subscription;
  constructor( private router: Router,
               private orderService: OrderService,
               private cd: ChangeDetectorRef) {
                this.tableFilters = { orderDate: '', requestedDeliveryDate: '', type: '',
                currentActivityStatusName: '', currentSelectedFilter: '', jobNo: '', printType: '' };
               }

  ngOnInit(): void {
    this.getProcustListTotalRecord();
  }

  getPlanningList(top: number = 10, skip: number = 0) {
    this.subscription = this.orderService.getPlanningOrders(this.jobNoSearch, top, skip,
      this.router.url.includes('file-prep')
      ).subscribe(resp => {
      this.planningList = resp.body.result ? resp.body.result as PlanningCaseDetail[] : [];
      this.isNodata = (this.planningList && this.planningList.length > 0) ? false : true;
      this.initializeDatatable();
    });
  }

  getProcustListTotalRecord = () => {
    this.totalRecordListSubscription = this.orderService.getPlannigListTotalRecord(this.jobNoSearch,
      this.router.url.includes('file-prep')).subscribe(resp => {
      this.getPlanningList();
      this.totalRecord = resp.body.result;
    });
  }

  initializeDatatable = () => {
    this.dataSource = new MatTableDataSource<PlanningCaseDetail>(this.planningList);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.dataSource.paginator.length = this.totalRecord;
      this.dataSource.paginator.pageIndex = this.pageIndex;
      }, 100);
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.isLoading = false;
    this.cd.detectChanges();
  }

  applySearch(event: Event) {
    // old code
    // this.globalFilter = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = JSON.stringify(this.tableFilters);
    this.globalFilter = this.jobNoSearch = (event.target as HTMLInputElement).value.trim();
    this.dataSource = [];
    this.isLoading = true;
    this.pageIndex = 0;
    this.getProcustListTotalRecord();
    this.getPlanningList();
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.TYPE) {
      this.tableFilters.type = this.selectedPrintType = this.tableFilters.type === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.ORDER_DATE) {
      this.tableFilters.orderDate = '';
    } else if (filterPropType === this.tableFilterTypes.TYPE) {
      this.tableFilters.type = this.selectedPrintType = '';
    } else if (filterPropType === this.tableFilterTypes.REQUEST_DELIVERYDATE) {
      this.tableFilters.requestedDeliveryDate = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.currentActivityStatusName = '';
    } else if (filterPropType === this.tableFilterTypes.JOB_NO) {
      this.tableFilters.jobNo = '';
    } else if (filterPropType === this.tableFilterTypes.PRINT_TYPE) {
      this.tableFilters.printType = '';
    } else if (filterPropType === 'clear') {
      this.tableFilters.orderDate = '';
      this.tableFilters.type = this.selectedPrintType = '';
      this.tableFilters.requestedDeliveryDate = '';
      this.tableFilters.currentActivityStatusName = '';
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: PlanningCaseDetail,
      filter: string
    ): boolean => {
      console.log(filter);
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
        new Date(data.requestedDeliveryDate)?.toLocaleDateString()
          .toString()
          .trim()
          .toLowerCase()
        .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.orderDate)?.toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.currentActivityStatusCode?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.jobNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.type?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.printType?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as PlanningSearchFilters;
      let matchedFilters = 0;
      let filterCounter = 0;

      if (this.tableFilters.orderDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.orderDate)?.toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.orderDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.requestedDeliveryDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.requestedDeliveryDate)?.toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.requestedDeliveryDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.type !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.type?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.type?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.currentActivityStatusName !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.currentActivityStatusName?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.currentActivityStatusName?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.jobNo !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.jobNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.jobNo?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.printType !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.jobNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.printType?.toLowerCase()) !== -1 ? 1 : 0
        );
      }


      if (filterCounter === 0) { return true; }
      return filterCounter === matchedFilters;
    };
    return myFilterPredicate;
  }

  lazyLoadPage(event: any) {
    this.dataSource = [];
    this.isLoading = true;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPlanningList(event.pageSize, event.pageSize * event.pageIndex);
  }

  goToPlanningDetail = (recordId: string) => {
    if (this.router.url){
      if (this.router.url.includes('file-prep')) {
        console.log('HEllo');
        this.router.navigate([`${AppPageRoutes.PLANNING_DETAIL}/file-prep/${recordId}`]);
        return;
      }
    }
    this.router.navigate([`${AppPageRoutes.PLANNING_DETAIL}/${recordId}`]);
  }
}
