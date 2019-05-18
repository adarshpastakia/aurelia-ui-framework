import { HttpClient } from "aurelia-fetch-client";
import { UIAppConfig } from "./ui-app-config";
export declare class UIHttpService {
    httpClient: HttpClient;
    private appConfig;
    private logger;
    constructor(httpClient: HttpClient, appConfig: UIAppConfig);
    setBaseUrl(url: any): void;
    json(slug: string, query?: KeyValue, headers?: KeyValue | boolean): Promise<KeyValue[] | KeyValue | void>;
    text(slug: string, query?: KeyValue, headers?: KeyValue | boolean): Promise<string | void>;
    blob(slug: string, query?: KeyValue, headers?: KeyValue | boolean): Promise<AnyObject | void>;
    patch(slug: string, body: any, headers?: KeyValue | boolean): Promise<KeyValue[] | KeyValue | void>;
    put(slug: string, body: any, headers?: KeyValue | boolean): Promise<KeyValue[] | KeyValue | void>;
    post(slug: string, body: any, headers?: KeyValue | boolean): Promise<KeyValue[] | KeyValue | void>;
    delete(slug: string, headers?: KeyValue | boolean): Promise<KeyValue[] | KeyValue | void>;
    upload(slug: string, form: HTMLFormElement, headers?: KeyValue | boolean): Promise<KeyValue[] | KeyValue | void>;
    reupload(slug: string, form: HTMLFormElement, headers?: KeyValue | boolean): Promise<KeyValue[] | KeyValue | void>;
    private buildQueryString;
    private __upload;
    private __getResponse;
    private __getHeaders;
}
