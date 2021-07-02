import { CreateCaseSteps } from '../enums/app-enums';

export interface CreateCaseStepperEvent {
    tabToOpen: string;
    createCaseStep: CreateCaseSteps;
}

export interface PageHeader {
    headerText: string;
    breadCrumb: string;
}
