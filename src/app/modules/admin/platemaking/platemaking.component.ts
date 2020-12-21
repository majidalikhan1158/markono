import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  PlatemakingSearchFilters,
  PlatemakingnSearchFilterTypes,
} from 'src/app/modules/shared/models/table-filter-modals';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { Router } from '@angular/router';
import { PlatemakingDataList } from 'src/app/modules/shared/mock-data/platemaking-data-list';
import { StatusTypes, PlatemakingListModel, StatusTypesArray } from 'src/app/modules/shared/models/plate-making';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenType } from 'src/app/modules/shared/enums/app-enums';
import { AppAuthService } from '../../services/core/services/app-auth.service';
import { CaseHelperService } from '../../shared/enums/helpers/case-helper.service';
import {
  ExpansionIcons,
} from 'src/app/modules/shared/enums/app-constants';
import { ProductSpecLayoutPrepCompBreakList } from '../../shared/mock-data/layout-prep-comp-break-list';
import { MachineTypeList } from '../../shared/enums/product-management/product-constants';
import { expandableRowAnimation } from './expandable-row.animation';
@Component({
  selector: 'app-platemaking',
  templateUrl: './platemaking.component.html',
  styleUrls: ['./platemaking.component.scss'],
  encapsulation: ViewEncapsulation.None,

  animations: [expandableRowAnimation],
})
export class PlatemakingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'jobNo',
    'customer',
    'isbn',
    'press',
    'platesToBeReadyBy',
    'printingDate',
    'qty',
    'webcode',
    'status',
    'actions',
    //'expandRow',
    //  'expandTable'
  ];
  columnsToDisplay = [
    '#',
    'Job No.',
    'Customer',
    'ISBN',
    'Press',
    'Plates to be ready by',
    'Printing Date',
    'Qty',
    'Webcode',
    'Status',
  ]
  columnsToDisplayCompBreakTable = [
    'Id',
    'Type',
    'Component',
    'Qty',
    'Printing Sheets',
    'Scrap',
    'Total Sheets',
    'Colour',
    'Paper',
    'Paper Size',
    'Machine Type',
  ];
  productSpecLayoutPrepCompBreakList = ProductSpecLayoutPrepCompBreakList;
  dataArray = PlatemakingDataList;
  machineTypeList = MachineTypeList;
  dataSource;
  tableFilters: PlatemakingSearchFilters = {
    jobNo: '',
    customer: '',
    platesTobeReadByDate: '',
    scheduledPrinitngDate: '',
    status: '',
  };
  tableFilterTypes = PlatemakingnSearchFilterTypes;
  statusTypes = StatusTypes;
  selectedStatus = '';
  globalFilter = '';
  statusTypesList = StatusTypesArray;
  ExpansionIcons = ExpansionIcons;
  rowIdToExpand = 0;
  chooseList = '';
  constructor(private modalService: ModalService, private router: Router,
    private snack: SnackBarService,) {
    this.dataSource = new MatTableDataSource<PlatemakingListModel>(this.dataArray);
  }

  ngOnInit(): void {
    // this.modalService.modalToBeOpen.subscribe(modalId => {
    //   if (modalId && modalId === UIModalID.ADD_PRODUCT_SPEC_MODAL) {
    //     this.modalService.open(modalId);
    //   }
    // });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  applySearch(event: Event) {
    this.globalFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = this.tableFilters.status === filterValue ? '' : filterValue;
    }
    this.tableFilters.status = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.PLATESTOBEREADBY_DATE) {
      this.tableFilters.platesTobeReadByDate = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = '';
    } else if (filterPropType === this.tableFilterTypes.SCHEDULEDPRINTING_DATE) {
      this.tableFilters.scheduledPrinitngDate = '';
    } else if (filterPropType === this.tableFilterTypes.CUSTOMER) {
      this.tableFilters.customer = '';
    } else if (filterPropType === this.tableFilterTypes.JOB_NO) {
      this.tableFilters.jobNo = '';
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: PlatemakingListModel,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          new Date(data.printingDate)
            .toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.platesToBeReadyBy)
            .toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.jobNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.customer
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.status
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as PlatemakingSearchFilters;
      let matchedFilters = 0;
      let filterCounter = 0;
      if (this.tableFilters.platesTobeReadByDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.platesToBeReadyBy)
            .toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.platesTobeReadByDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.scheduledPrinitngDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.printingDate)
            .toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.scheduledPrinitngDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.status !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.status)
            .toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.status).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.status !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.status
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.status.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.jobNo !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.jobNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.jobNo.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.customer !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.customer
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.customer.toLowerCase()) !== -1 ? 1 : 0
        );
      }

      if (filterCounter === 0) { return true; }
      return filterCounter === matchedFilters;
    };
    return myFilterPredicate;
  }

  handleAddProductSpecEvent(modalId: string) {
    this.modalService.close(modalId);
    this.router.navigate(['admin/product-management/create']);
  }

  handleModalRejectEvent(modalId: string) { }

  Choose() {

  }

  toggleExpandable(id: number): void {
    this.rowIdToExpand = this.rowIdToExpand === id
      ? 0
      : id;
  }
  chooseSelectionChange(event: Event) {
    let a = 'Hold';
    console.log('lllllllllllll', a)
    if (a == 'Hold') {
      console.log(true)
      this.modalService.open('ADD_REASON_MODAL');
    }

  }
  handleAddReasonEvent(modalId: string) {
    this.snack.open('Reason is Saved');
  }

}




