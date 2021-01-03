export interface AdditionalSpecTypes {
  addChildIsbn: boolean;
  addDVDCD: boolean;
  addwebCode: boolean;
}

export interface AddRemoveSpecTypeEvent {
  productSpecType: string;
  isAdded: boolean;
}

export interface SelectionList {
  value: number;
  text: string;
  enum: string;
}

export interface ProductSpecTypeObject {
  value: string;
  id: number;
  enum: string;
  isSelected: boolean;
  isVisited: boolean;
}
