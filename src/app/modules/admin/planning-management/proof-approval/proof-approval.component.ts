import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { FileCheckConfig } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { CoverProofApprovalList, TextProofApprovalList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ApprovalParam } from 'src/app/modules/shared/models/estimation';
import { CaseDetailModal } from 'src/app/modules/shared/models/order-management';

@Component({
  selector: 'app-proof-approval',
  templateUrl: './proof-approval.component.html',
  styleUrls: ['./proof-approval.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProofApprovalComponent implements OnInit, OnDestroy {
  coverCheckList = CoverProofApprovalList;
  textCheckList = TextProofApprovalList;
  isAgree: boolean;
  @Input() filePrepCaseDetail: CaseDetailModal;
  constructor(private productservice: ProductService) { }

  ngOnInit(){
    this.isAgree = false;
  }

  ngOnDestroy(){

  }

  createProductSpec(){
    const inputData = new ApprovalParam();
    inputData.acknowledged = this.isAgree;
    // this.productservice.setProofApproval().subscribe(resp => {

    // });
  }

}
