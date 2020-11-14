// Angular Modules
import { Injectable } from '@angular/core';
// Application Constants
import { Constants } from 'src/app/modules/services/config/constants';
import { Endpoints } from '../../config/endpoints';
import { QueryStringParameters } from '../../shared/classes/query-string-parameter';
import { UrlBuilder } from '../../shared/classes/url-builder';

@Injectable({
  providedIn: 'root',
})
// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService {
  constructor(private constants: Constants) {}

  private getOrderServicesEndpoint = () =>
    `${this.constants.API_BASE_ADDRESS}${this.constants.API_ENDPOINT_ORDER_SERVICES}`

  private getProductServicesEndpoint = () =>
    `${this.constants.API_BASE_ADDRESS}${this.constants.API_ENDPOINT_PRODUCT_SERVICES}`

  public getOrderServicesTokenUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.authentication.getOrderServicesToken}`

  public getProductServicesTokenUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.authentication.getProductServicesToken}`

  public getCaseTypeUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getCaseType}`

  public getCustomerDetailUrl = () =>
    `${Endpoints.case.getCustomerDetail}`

  public getShipmentModeUrl = () =>
  `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentMode}`

  public getShipmentTermUrl = () =>
  `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentTerm}`

  public getShipmentAgentUrl = () =>
  `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentAgent}`

  public getLiveVersion = () =>
  `${this.getProductServicesEndpoint()}${Endpoints.product.getLiveVersion}`

  public getProductVersionUrl = () =>
  `${this.getProductServicesEndpoint()}${Endpoints.product.getProductVersions}`
}
