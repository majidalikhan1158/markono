import { RecordType } from 'src/app/modules/shared/enums/app-enums';
import { CostCategory } from '../response-modal';

export interface DDLListModal {
  id: number;
  attributes: {
    code: string;
    description: string;
    shipToCode: string;
  };
}

export interface DDLObjectModal {
  data: DDLObjectModalProp;
  type: RecordType;
}

export class DDLObjectModalProp {
    caseTypesList: DDLListModal[];
    shipmentModeList: DDLListModal[];
    shipmentTermList: DDLListModal[];
    shipmentAgentList: DDLListModal[];
    miscBillingCostCategoryList: CostCategory[];
    shippingInfoCostCategoryList: CostCategory[];
}

export interface ShipToCode {
  address1: string;
  address2: string;
  attention: string;
  city: string;
  code: string;
  companyName: string;
  countryCode: string;
  createdBy: string;
  createdDateTime: Date;
  email: string;
  id: number;
  isDeleted: boolean;
  phoneNo: string;
  postCode: string;
  updatedBy: string;
  updatedDateTime: Date;
}
