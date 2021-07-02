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

  private getEmotionServicesEndpoint = () =>
    `${this.constants.API_BASE_ADDRESS}${this.constants.API_ENDPOINT_EMOTION_SERVICES}`

  private getEstimationServicesEndPoint = () =>
    `${this.constants.API_BASE_ADDRESS}${this.constants.API_ENDPOINT_ESTIMATION_SERVICES}`

  getOrderServicesTokenUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.authentication.getOrderServicesToken}`

  getProductServicesTokenUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.authentication.getProductServicesToken}`

  getEstimationServicesTokenUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.authentication.getEstimationServicesToken}`

  getShopFloorTokenUrl = () =>
    `${Endpoints.authentication.getShopFloorCollectionToken}`

  getEmotionServicesTokenUrl = () =>
    `${this.getEmotionServicesEndpoint()}${Endpoints.authentication.getEmotionServicesToken}`

  getCaseTypeUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getCaseType}`

  getCustomerDetailUrl = () =>
    `${this.getEmotionServicesEndpoint()}${Endpoints.case.getCustomerDetail}`

  getShipmentModeUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentMode}`

  getShipmentTermUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentTerm}`

  getShipmentAgentUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getShipmentAgent}`

  getMiscBillingCostCategoryUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getMiscBillingCostCategory}`

  getShippingInfoCostCategoryUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.getShippingInfoCostCategory}`

  getLiveVersion = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getLiveVersion}`

  getProductVersionUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getProductVersions}`

  getCreateCaseUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.createCase}`

  public getCreateShipmentUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.case.createShipment}`

  getMachinesList = () =>
    `${this.getShopFloorServicesEndpoint()}${Endpoints.shopFloor.getMachinesList}`

  getProductsUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getProducts}`

  getProductList = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.GetProductList}`

  getSearchProductsUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getSearchProductsList}`

  getProductsListUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getProductsList}`

  getProductGroupUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getProductGroups}`

  getPaperMaterialUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getPaperMaterial}`

  getFinishingTypeUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getFinishingType}`

  getBindingTypeUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getBindingType}`

  getSpineWidthUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getSpineWidth}`

  getBookWeightUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getBookWeight}`

  setLayoutReadyUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.setLayoutReady}`

  getCreateProductUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.createProduct}`

  getCreateProductRevisionUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.createProductRevision}`

  getFileCheckConfigUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getFileCheckConfig}`

  getCreateCheckPrintFileUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getCreateCheckPrintFile}`

  getFileCheckUrl = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.getFileCheck}`

  // order-managemnt-module
  getAllOrders = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getAllOrders}`

  getAllOrderDetails = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getAllOrderDetails}`

  getPlanningOrder = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getCaseDetails}`

  getCaseDetails = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.caseDetails}`

  getOrderDeatils = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getAllOrders}`

  getShipmentDetails = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getShipmentDetails}`

  getShipmentAgentsList = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getShipmentAgents}`

  getShipmentModesList = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getShipmentModes}`

  getShipmentTermsList = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getShipmentTerms}`

  setLiveVersion = () =>
    `${this.getProductServicesEndpoint()}${Endpoints.product.setLiveVersion}`

  getImpositionLayoutUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getImpositionLayout}`

  getEstimationUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getEstimation}`

  getCalculatePaperUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getCalculatePaper}`

  setReleaseUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.setRelease}`

  setCaseActivityUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getCaseActivity}`

  getCreateLayoutPrepUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getCreateLayoutPrep}`

  getActivitySettingsNotUnitOfListUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getActivitySettingsNotUnitOfList}`

  getShipToCodeUrl = () =>
    `${this.getOrderServicesEndpoint()}${Endpoints.order.getShipToCode}`

  getProductSpecViaCaseDetailUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getProductSpecViaCaseDetail}`

  getEstimatedPriceProductDetailUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getEstimatedPriceProductDetail}`

  getCalculateProductionProcessUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.CalculateProductionProcess}`

  getEstimationUrlViaCaseDetailUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getEstimationsViaCaseDetail}`

  getCreateCaseLayoutUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.case.createCaseLayout}`

  getUpdateLayoutPrepUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getUpdateLayoutPrep}`

  getEstimateLayoutUrl = () =>
    `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.getEstimateLayout}`

  UpdateCaseProductFileCheckUrl = () =>
   `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.UpdateCaseProductFileCheck}`

  CreateProofApprovalUrl = () =>
   `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.CreateProofApproval}`

   GetCaseFileCheck = () =>
   `${this.getEstimationServicesEndPoint()}${Endpoints.estimation.GetCaseFileCheck}`

}
