import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentsBreakDown, ImpositionInputs } from '../../../models/estimation';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { SnackBarService } from '../../../ui-services/snack-bar.service';

@Component({
  selector: 'app-add-component-breakdown',
  templateUrl: './add-component-breakdown.component.html',
  styleUrls: ['./add-component-breakdown.component.scss']
})
export class AddComponentBreakdownComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter<ComponentsBreakDown>();
  @Input() componentList: ImpositionInputs[];
  componentBreakdown: ComponentsBreakDown;
  subscription: Subscription;
  constructor(private productService: ProductService,
              private snack: SnackBarService) {
                if (!this.componentBreakdown) {
                  this.componentBreakdown = this.getDefaultData();
                }
              }

  ngOnInit(): void {

  }

  getDefaultData = (): ComponentsBreakDown => {
    return {
      Id: '',
      SNo: 0,
      Quantity: 0,
      Layout: '',
      LayoutDescription: '',
      Colour: '',
      Paper: '',
      PaperSize: '',
      MachineType: '',
      ProcessCode: '',
      ComponentType: '',
      PrintingSheets: 0,
      Scrap: 0,
      TotalSheets: 0,
      ComponentId: '',
      EstimationCaseDetailid: '',
      ComponentsSNo: 0,
      Deleted: false,
      SheetID: '',
      PrintingMethod: '',
      CreatedBy: '',
      CreatedDateTime: new Date(),
      UpdatedBy: '',
      UpdatedDateTime: new Date()
    };
  }

  handleComponentTypeChange = () => {
    const componentTypeObj = this.componentList.find(x => x.Id === this.componentBreakdown.ComponentId);
    this.componentBreakdown.ComponentType = componentTypeObj?.ComponentType ?? '';
    this.componentBreakdown.Layout = componentTypeObj?.ImpositionLayout ?? '';
    this.componentBreakdown.Paper = componentTypeObj?.Paper ?? '';
  }

  addComponentBreakdown = () => {
    const componentObj = this.componentList.find(x => x.Id === this.componentBreakdown.ComponentId);
    if (!componentObj) {
      this.snack.open('Component is required');
      return;
    }
    const componentTypeObj = this.componentList.find(x => x.Id === this.componentBreakdown.ComponentId);
    this.componentBreakdown.ComponentType = componentTypeObj.ComponentType;
    this.componentBreakdown.ComponentsSNo = componentTypeObj.SNo;
    this.acceptEvent.emit(this.componentBreakdown);
    this.componentBreakdown = null;
    this.subscription?.unsubscribe();
  }

  close = () => {
    this.componentBreakdown = null;
    this.subscription?.unsubscribe();
    this.acceptEvent.emit(null);
  }

}
