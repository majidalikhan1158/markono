import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImpositionLayoutList, GrainDirectionList, MachineTypeList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductSpecLayoutPrepCompBreakList } from 'src/app/modules/shared/mock-data/layout-prep-comp-break-list';
import { ProductSpecLayoutPrepCompList } from 'src/app/modules/shared/mock-data/layout-prep-comp-list';
import { ProductSpecLayoutPrepProdActivityList } from 'src/app/modules/shared/mock-data/layout-prep-production-activty-list';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';

@Component({
  selector: 'app-spec-layout-prep',
  templateUrl: './spec-layout-prep.component.html',
  styleUrls: ['./spec-layout-prep.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SpecLayoutPrepComponent implements OnInit {
  columnsToDisplayCompTable = [
    'Component Type',
    'Imposition Layout',
    'Grain Direction',
    'Cutting Size (Depth)',
    'Cutting Size (Width)',
    'Paper',
  ];
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
  columnsToDisplayProdActivityTable = [
    'Com.Id',
    'Dept.',
    'Type',
    'Qty',
    'Layout',
    'Process Code',
    'Activity',
    'Units',
    'Duration',
    'Unit Costs',
    'New Units Costs',
    'Total Est. Costs',
    '%', ''
  ];
  productSpecLayoutPrepCompList = ProductSpecLayoutPrepCompList;
  impositionLayoutList = ImpositionLayoutList;
  grainDirectionList = GrainDirectionList;
  machineTypeList = MachineTypeList;
  productSpecLayoutPrepCompBreakList = ProductSpecLayoutPrepCompBreakList;
  productSpecLayoutPrepProdActivityList = ProductSpecLayoutPrepProdActivityList;
  ExpansionIcons = ExpansionIcons;
  constructor() { }

  ngOnInit(): void {
  }

}
