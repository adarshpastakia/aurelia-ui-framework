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
    get(slug: string, basicAuth?: boolean): Promise<any | string | void>;
    text(slug: string, basicAuth?: boolean): Promise<any | string | void>;
    put(slug: string, obj: any, basicAuth?: boolean): Promise<any | string | void>;
    post(slug: string, obj: any, basicAuth?: boolean): Promise<any | string | void>;
    delete(slug: string, basicAuth?: boolean): Promise<any | string | void>;
    upload(slug: string, form: HTMLFormElement, basicAuth?: boolean): Promise<any | string | void>;
    reupload(slug: string, form: HTMLFormElement, basicAuth?: boolean): Promise<any | string | void>;
    private __upload(method, slug, form, basicAuth?);
    private __getHeaders(basic?);
}
