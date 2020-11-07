import { RecordType } from 'src/app/modules/shared/enums/app-enums';

export interface DDLListModal {
  id: number;
  attributes: {
    code: string;
    description: string;
  };
}

export class DDLObjectModal {
  data: {
    caseTypesList: DDLListModal[];
    shipmentModeList: DDLListModal[];
    shipmentTermList: DDLListModal[];
    shipmentAgentList: DDLListModal[];
  };
  type: RecordType;
}
