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
  constructor(private constants: Constants) {}

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

  getShopFloorTokenUrl = () =>
    `https://cors-anywhere.herokuapp.com/${Endpoints.authentication.getShopFloorCollectionToken}`

  getCaseTypeUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getCaseType}`

  getCustomerDetailUrl = () =>
    `${Endpoints.case.getCustomerDetail}`

  getShipmentModeUrl = () =>
  `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentMode}`

  getShipmentTermUrl = () =>
  `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentTerm}`

  getShipmentAgentUrl = () =>
  `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentAgent}`

  getLiveVersion = () =>
  `${this.getProductServicesEndpoint()}${Endpoints.product.getLiveVersion}`

  getProductVersionUrl = () =>
  `${this.getProductServicesEndpoint()}${Endpoints.product.getProductVersions}`

  getCreateCaseUrl = () =>
  `${this.getOrderServicesEndpoint()}${Endpoints.case.createCase}`

  getMachinesList = () =>
  `https://cors-anywhere.herokuapp.com/${this.getShopFloorServicesEndpoint()}${Endpoints.shopFloor.getMachinesList}`

}
