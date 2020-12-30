import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductVersions } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrls: ['./product-versions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductVersionsComponent implements OnInit {
  displayedColumns = ['versionNo', 'dateCreated', 'createdBy', 'versionDescription', 'isSpecsInView'];
  productIsbnNumber: string;
  productVersionList: ProductVersions[];
  constructor(public store: ProductSpecStore) { }

  ngOnInit() {
    this.getVersions();
    this.store.productSpecStore.subscribe(resp => {
      if (resp && resp.generalVM && resp.generalVM.productNumber && this.productIsbnNumber !== resp.generalVM.productNumber) {
        this.productIsbnNumber = resp.generalVM.productNumber;
        this.store.getVersions(this.productIsbnNumber);
      }
    });
  }

  getVersions = () => {
    this.store.$productVersionList.subscribe(resp => {
      console.log(resp);
      this.productVersionList = resp;
    });
  }

  handleVersionSelection = (versionId: string) => {
    const selectedVersion = this.productVersionList.find(x => x.Id === versionId);
    this.store.setSelectedVersion(selectedVersion);
  }

}
