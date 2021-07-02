import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FileCheckConfig } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { CoverProofApprovalList, TextProofApprovalList } from 'src/app/modules/shared/enums/product-management/product-constants';

@Component({
  selector: 'app-proof-approval',
  templateUrl: './proof-approval.component.html',
  styleUrls: ['./proof-approval.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProofApprovalComponent implements OnInit, OnDestroy {
  coverCheckList = CoverProofApprovalList;
  textCheckList = TextProofApprovalList;
  constructor() { }

  ngOnInit(){

  }

  ngOnDestroy(){

  }

}
