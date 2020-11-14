import { Injectable } from '@angular/core';
import { ProductISBNDetailVM } from '../../models/create-case';

@Injectable({
  providedIn: 'root',
})
export class ProductHelperService {
  constructor() {}

  public TransToProductISBNDetailVM = (data: any): ProductISBNDetailVM => {
    return {
      id: data.id,
      title: data.attributes['product-description'],
      totalExtent: data.attributes['txt-total-extent'],
      bindingType: data.attributes['binding-type'],
      productGroup: data.attributes['product-group'],
      samplesRequired: 0,
      bluePrintRequired: 0,
      specsVersionNo: data.attributes['version-no'],
      owner: data.attributes['isbn-owner'],
      jobType: '',
      weight: data.attributes['weight'],
      fGRequired: 0,
      advancesRequired: 0,
      quoteNo: '',
      estimatedPrice: data.attributes['estimated-price'],
      additionalUnitPrice: 0,
      sampleList: [],
      bluePrintList: [],
    };
  }
}
