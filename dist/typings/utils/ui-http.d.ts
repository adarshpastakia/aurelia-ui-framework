import { HttpClient } from "aurelia-fetch-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { UIApplication } from "./ui-application";
export declare class UIHttpService {
    httpClient: HttpClient;
    app: UIApplication;
    eventAggregator: EventAggregator;
    private logger;
    constructor(httpClient: HttpClient, app: UIApplication, eventAggregator: EventAggregator);
    setBaseUrl(url: any): void;
    buildQueryString(json: any): string;
    get(slug: string, headers?: any): Promise<any | string | void>;
    json(slug: string, query?: any, headers?: any): Promise<any | string | void>;
    text(slug: string, query?: any, headers?: any): Promise<any | string | void>;
    blob(slug: string, query?: any, headers?: any): Promise<any | string | void>;
    patch(slug: string, body: any, headers?: any): Promise<any | string | void>;
    put(slug: string, body: any, headers?: any): Promise<any | string | void>;
    post(slug: string, body: any, headers?: any): Promise<any | string | void>;
    delete(slug: string, headers?: any): Promise<any | string | void>;
    upload(slug: string, form: HTMLFormElement, headers?: any): Promise<any | string | void>;
    reupload(slug: string, form: HTMLFormElement, headers?: any): Promise<any | string | void>;
    private __upload(method, slug, form, headers?);
    private __getResponse(response);
    private __getHeaders(override?);
}
