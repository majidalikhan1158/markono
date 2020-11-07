import { Injectable } from '@angular/core';
import { QueryStringParameters } from '../../shared/classes/query-string-parameter';
import { UrlBuilder } from '../../shared/classes/url-builder';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public createUrlWithQueryParameters = (url: string, queryStringHandler?:
    (queryStringParameters: QueryStringParameters) => void): string => {
    const urlBuilder: UrlBuilder = new UrlBuilder(url);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }
}
