import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GroupedProductVersions, ProductVersions } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { SnackBarService } from '../../../../shared/ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../../services/core/services/product.service';
import { CaseStore } from '../../../../shared/ui-services/create-case.service';
import { ProductSpecHelperService } from '../../../../shared/enums/helpers/product-spec-helper.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrls: ['./product-versions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductVersionsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['versionNo', 'revision', 'dateCreated', 'createdBy', 'versionDescription', 'isSpecsInView'];
  productIsbnNumber: string;
  productVersionList: ProductVersions[];
  selectedVersion: string;
  subscription: Subscription;
  dataArray: ProductVersions[];
  parentVersionsDataSource;
  description: string;
  groupedVersionList: GroupedProductVersions[] = [];
  expandedElement: GroupedProductVersions;
  productVersion: ProductVersions;
  constructor(public store: ProductSpecStore,
              private snak: SnackBarService,
              private cd: ChangeDetectorRef,
              private productService: ProductService,
              private caseStore: CaseStore,
              private helper: ProductSpecHelperService,
              private snack: SnackBarService) { }

  ngOnInit() {
    this.subscription = this.store.$productSpecStore.subscribe(resp => {
      this.productVersion = resp.selectedVersion;
    });

    this.getVersions();

    this.subscription = this.store.$productSpecStore.subscribe(resp => {
      if (resp && resp.generalVM && resp.generalVM.productNumber && this.productIsbnNumber !== resp.generalVM.productNumber) {
        this.productIsbnNumber = resp.generalVM.productNumber;
        this.selectedVersion = resp.generalVM.versionNo;
        this.store.getVersions(this.productIsbnNumber);
      }
    });

  }

  getVersions = () => {
    let selectedVersion = '';
    this.productVersionList = [];
    this.subscription = this.store.$productVersionList.subscribe(resp => {
      resp.forEach(item => {
        if (item.VersionNo === this.productVersion?.VersionNo && item.Revision === this.productVersion?.Revision) {
          item.active = true;
          item.VersionDescription = this.productVersion?.VersionDescription ?? '';
          selectedVersion = item.Id;
        } else { item.active = false;}
      });
      this.productVersionList = resp.sort((a, b) => {
        return (new Date(b.CreatedDateTime) as any) - (new Date(a.CreatedDateTime) as any);
      });

      const groupedRecords = this.performGroupByVersionOperation();
      this.groupedVersionList = [];
      for (const [key, value] of Object.entries(groupedRecords)) {
        const versionsList = value as any as ProductVersions[];
        const parentVersion: ProductVersions = versionsList && versionsList.length > 0 ? versionsList[0] : null;
        if (!parentVersion) {
          return;
        }
        versionsList.splice(0, 1);
        this.groupedVersionList.push({
          ParentVersion: parentVersion,
          ChildVersions: versionsList
        });
      }
      this.handleVersionSelection(selectedVersion);
      this.initializeDatatable();
    });
  }

  performGroupByVersionOperation = () => {
    return this.productVersionList.reduce((r, a) => {
      r[a.VersionNo] = r[a.VersionNo] || [];
      r[a.VersionNo].push(a);
      return r;
    }, Object.create(null));
  }

  initializeDatatable = () => {
    this.parentVersionsDataSource = new MatTableDataSource<GroupedProductVersions>(this.groupedVersionList);
    this.parentVersionsDataSource.paginator = this.paginator;
    this.cd.detectChanges();
  }

  handleVersionSelection = (versionId: string, showMessage = 0, includeRevision: boolean = false) => {
    const selectedVersion = this.productVersionList.find(x => x.Id === versionId);

    if (selectedVersion) {
      if (showMessage > 0) {
        this.getVersionSpecs(selectedVersion, includeRevision);
      } else {
        selectedVersion.VersionDescription = this.productVersion.VersionDescription;
        this.store.setSelectedVersion(selectedVersion);
      }
    }
  }

  getVersionSpecs = (selectedVersion: ProductVersions, includeRevision: boolean = false) => {
    const reqObj = {
      isbn: this.productIsbnNumber,
      VersionNo: selectedVersion.VersionNo,
      RevisionNo: includeRevision ? selectedVersion.Revision : null
    };
    this.store.reset();
    this.productService.getProductDetails(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        const productDetails = resp.body.result[0];
        this.store.setPlanningModuleState(false);
        this.caseStore.setJobNo(null);
        this.helper.transProductDetailToVM(productDetails);
        this.store.setProductSpecReadonly(true);
        this.store.setProductSpecStatus({status: productDetails.Status, tooltipMessage: '' });
        this.getVersions();
        // selectedVersion.VersionDescription = this.productVersion.VersionDescription;
        // this.store.setSelectedVersion(selectedVersion);
        includeRevision
        ? this.snak.open(`Revision has been selected successfully to ${selectedVersion?.Revision ?? ''}`)
        : this.snak.open(`Version has been selected successfully to ${selectedVersion?.VersionNo ?? ''}`);
      } else {
        includeRevision
        ? this.snack.open(`No details found against VERSION = ${selectedVersion.VersionNo} and ISBN = ${this.productIsbnNumber} and Revision = ${selectedVersion.Revision}`)
        : this.snack.open(`No details found against VERSION = ${selectedVersion.VersionNo} and ISBN = ${this.productIsbnNumber}`);
      }
    });
  }

  handleRowClick = (row: GroupedProductVersions) => {
    if (this.expandedElement && this.expandedElement.ParentVersion.Id === row.ParentVersion.Id) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
    }
  }

  ngOnDestroy(): void {
    this.store.setVersions([]);
    this.selectedVersion = '';
    this.productVersion = null;
    this.groupedVersionList = [];
    this.parentVersionsDataSource = null;
    this.expandedElement = null;
    this.subscription?.unsubscribe();
  }

}
