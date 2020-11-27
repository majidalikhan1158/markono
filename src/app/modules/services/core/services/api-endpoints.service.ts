// Angular Modules
import { Injectable } from '@angular/core';
// Application Constants
import { Constants } from 'src/app/modules/services/config/constants';
import { Endpoints } from '../../config/endpoints';

@Injectable({
  providedIn: 'root',
})
// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService {
  constructor(private constants: Constants) { }

  private getOrderServicesEndpoint = () =>
    `${this.constants.API_BASE_ADDRESS}${this.constants.API_ENDPOINT_ORDER_SERVICES}`

  private getProductServicesEndpoint = () =>
    `${this.constants.API_BASE_ADDRESS}${this.constants.API_ENDPOINT_PRODUCT_SERVICES}`

  private getShopFloorServicesEndpoint = () =>
    `${this.constants.API_BASE_ADDRESS}${this.constants.API_ENDPOINT_SHOP_FLOOR_SERVICES}`

  getOrderServicesTokenUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.authentication.getOrderServicesToken}`

  getProductServicesTokenUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.authentication.getProductServicesToken}`

  public getShopFloorTokenUrl = () =>
    `${Endpoints.authentication.getShopFloorCollectionToken}`

  getCaseTypeUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getCaseType}`

  getCustomerDetailUrl = () =>
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

  public getCreateCaseUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.createCase}`

  public getCreateShipmentUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.createShipment}`

  public getMachinesList = () =>
    `${this.getShopFloorServicesEndpoint()}${Endpoints.shopFloor.getMachinesList}`

  public getQuotationsUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getQuotationsList}`
}
