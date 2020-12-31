import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ColorTypeList} from 'src/app/modules/shared/enums/product-management/product-constants';
import { TextVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MaterialDataList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
@Component({
  selector: 'app-spec-text',
  templateUrl: './spec-text.component.html',
  styleUrls: ['./spec-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecTextComponent implements OnInit, OnDestroy {

  materialDataList: MaterialDataList[];
  materialWeightList: string[];
  materialList: string[];
  materialBrandList: string[];
  finishingTypeList: string[];
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: string[] = [];
  viewModal: TextVM;
  materialWeightFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();
  filteredMaterialWeightList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected onDestroy = new Subject<void>();
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.store.getCoverMaterialWeight('Text', ProductSpecTypes.TEXT);
    this.store.getFinishingTypes('Text', ProductSpecTypes.TEXT);
    this.getApiData();
    this.getDefaultRecord();
  }

  getApiData = () => {
    this.store.$textMaterialDataList.subscribe(list => {
      this.materialDataList = list;
      this.materialWeightList = [...new Set(this.materialDataList.map(x => x.PaperWeight))];
      this.handleMaterialWeightFilterAutoComplete();
    });

    this.store.$textFinishingTypeList.subscribe(list => {
      this.finishingTypeList = list;
      this.handleFinishingTypeFilterAutoComplete();
    });
  }

  handleMaterialWeightChange = (type: string) => {
    if (type === 'MATERIALWEIGHT') {
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal.textMaterialWeight);
      this.materialList = [...new Set(records.map(x => x.PaperMaterial))];
    } else if (type === 'MATERIAL') {
      const records = this.materialDataList.filter(x => x.PaperMaterial === this.viewModal.textMaterial);
      this.materialBrandList = [...new Set(records.map(x => x.PaperBrand))];
    }
  }

  handleColorChange(color: string) {
    if (this.viewModal.colorType.includes(color)) {
      this.viewModal.colorType = this.viewModal.colorType.filter(x => x !== color);
    } else {
      this.viewModal.colorType.push(color);
    }
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.pantoneColour.indexOf(value) === -1) {
      this.viewModal.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.viewModal.pantoneColour = this.viewModal.pantoneColour.filter(
      (x) => x !== item
    );
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.viewModal.finishingType = this.viewModal.finishingType.filter(x => x !== recordId);
  }

  getDefaultRecord = () => {
    this.store.$productSpecStore.subscribe((resp) => {
      if (resp && resp.textVM && resp.textVM.id > 0) {
        this.viewModal = resp.textVM;
        this.handleMaterialWeightChange('MATERIALWEIGHT');
        this.handleMaterialWeightChange('MATERIAL');
      } else {
        this.viewModal = this.initialObject();
      }
    });
  }

  initialObject = (): TextVM => {
    return {
      id: 1,
      textMaterialWeight: '',
      textMaterial: '',
      materialBrand: '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorType: [],
      pantoneColour: [],
      finishingType: [],
      specialInstructions: '',
    };
  }

  handleMaterialWeightFilterAutoComplete = () => {
    this.filteredMaterialWeightList.next(this.materialWeightList.slice());
    this.materialWeightFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterialWeight();
      });
  }

  filterMaterialWeight = () => {
    if (!this.materialWeightList) {
      return;
    }
    // get the search keyword
    let search = this.materialWeightFltrCtrl.value;
    if (!search) {
      this.filteredMaterialWeightList.next(this.materialWeightList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialWeightList.next(
      this.materialWeightList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleFinishingTypeFilterAutoComplete = () => {
    this.filteredFinishingTypeList.next(this.finishingTypeList.slice());
    this.finishingTypeFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterFinishingType();
      });
  }

  filterFinishingType = () => {
    if (!this.finishingTypeList) {
      return;
    }
    // get the search keyword
    let search = this.finishingTypeFltrCtrl.value;
    if (!search) {
      this.filteredFinishingTypeList.next(this.finishingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFinishingTypeList.next(
      this.finishingTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.TEXT);
  }
}
