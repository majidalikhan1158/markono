import { RecordType } from 'src/app/modules/shared/enums/app-enums';

export interface DDLListModal {
  id: number;
  attributes: {
    code: string;
    description: string;
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
}
