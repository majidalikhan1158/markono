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
  value: any;
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

export interface ProductSpecStatus {
  status: string;
  tooltipMessage: string;
}

export interface PrepressChecklist {
  title: string;
  childTitles: PrepressChildChecklist[]
}

export interface PrepressChildChecklist {
  title: string;
  bullet: string;
}