import { CreateCaseSteps } from '../enums/app-constants';

export interface CreateCaseStepperEvent {
    tabToOpen: string;
    createCaseStep: CreateCaseSteps;
}
