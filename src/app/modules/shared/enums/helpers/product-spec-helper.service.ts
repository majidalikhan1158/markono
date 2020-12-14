import { Injectable } from '@angular/core';
import {
  BindingTypeCaseBound,
  BindingTypeFolding,
  BindingTypePaperBack,
  BindingTypeSpiralBound,
  BindingTypeStichType,
  BindingTypeWireoBinding,
} from '../../models/product-spec';

@Injectable({
  providedIn: 'root',
})
export class ProductSpecHelperService {
  constructor() {}

  getCaseBoundTypeObject = (): BindingTypeCaseBound => {
    return {
      bindingMethod: '',
      bookSpineType: '',
      isHeadTailBand: false,
      headTailBandColour: '',
      isRibbon: false,
      greyboardThickness: '',
      specialInstruction1: '',
      benchworkRequired: '',
      specialInstruction2: '',
      endPaperWeight: '',
      endPaperMaterial: '',
      materialBrand: '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorType: [],
      pantoneColour: [],
      finishingType: [],
      specialInstructions3: '',
    };
  }

  getFoldingTypeObject = (): BindingTypeFolding => {
    return {
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getSaddleStitchTypeObject = (): BindingTypeStichType => {
    return {
      stichType: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getWireOBindingTypeObject = (): BindingTypeWireoBinding => {
    return {
      wireColour: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getSpiralBoundTypeObject = (): BindingTypeSpiralBound => {
    return {
      coilColour: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getPaperBackTypeObject = (): BindingTypePaperBack => {
    return {
      bindingMethod: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }
}
