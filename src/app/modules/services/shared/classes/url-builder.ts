import { QueryStringParameters } from './query-string-parameter';

export class UrlBuilder {
    public url: string;
    public queryString: QueryStringParameters;

    constructor(
        private baseUrl: string,
        queryString?: QueryStringParameters
    ) {
        this.url = [baseUrl].join('/');
        this.queryString = queryString || new QueryStringParameters();
    }

    public toString(): string {
        const qs: string = this.queryString ? this.queryString.toString() : '';
        return qs ? `${this.url}?${qs}` : this.url;
    }
}
