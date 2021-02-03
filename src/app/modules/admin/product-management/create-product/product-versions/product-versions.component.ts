import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductVersions } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { SnackBarService } from '../../../../shared/ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrls: ['./product-versions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductVersionsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['versionNo', 'dateCreated', 'createdBy', 'versionDescription', 'isSpecsInView'];
  productIsbnNumber: string;
  productVersionList: ProductVersions[];
  selectedVersion: string;
  subscription: Subscription;
  dataArray: ProductVersions[];
  dataSource;
  description: string;
  constructor(public store: ProductSpecStore, private snak: SnackBarService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.store.$productSpecStore.subscribe(resp => {
      const selectedVersion = resp.selectedVersion;
      if (selectedVersion && selectedVersion.VersionDescription) {
       this.description = selectedVersion.VersionDescription;
      }
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
    this.subscription = this.store.$productVersionList.subscribe(resp => {
      resp.forEach(item => {
        if (item.VersionNo === this.selectedVersion) {
          item.active = true;
          item.VersionDescription = this.description;
          selectedVersion = item.Id;
        }
      });
      this.productVersionList = this.dataArray = resp.sort((a, b) => {
        return (new Date(b.CreatedDateTime) as any) - (new Date(a.CreatedDateTime) as any);
      });
      this.handleVersionSelection(selectedVersion);
      this.initializeDatatable();
    });
  }

  initializeDatatable = () => {
    this.dataSource = new MatTableDataSource<ProductVersions>(this.dataArray);
    this.dataSource.paginator = this.paginator;
    this.cd.detectChanges();
  }

  handleVersionSelection = (versionId: string, showMessage = 0) => {
    const selectedVersion = this.productVersionList.find(x => x.Id === versionId);
    if (selectedVersion && showMessage > 0) {
      this.snak.open(`Version has been selected successfully to ${selectedVersion?.VersionNo ?? ''}`);
    }
    if (selectedVersion) {
      selectedVersion.VersionDescription = this.description;
    }
    this.store.setSelectedVersion(selectedVersion);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
