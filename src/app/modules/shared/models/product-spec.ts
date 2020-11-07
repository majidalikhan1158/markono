export interface ProductSpecList {
  id: number;
  isbn: string;
  productTitle: string;
  dateCreated: number;
  createdBy: string;
  isbnOwner: string;
  printingType: string;
  version: string;
}

export interface WebCodeViewModel {
  id: number;
  webcodeLocation: string;
  noOfWebcode: string;
  xCoordinate: number;
  ycoordinate: number;
  specialInstructions: string;
}

export interface DVDViewModel {
  id: number;
  type: string;
  quantity: number;
  sleeveType: string;
}