export declare module UIConstants {
    var AppKey: string;
    var Title: string;
    var SubTitle: string;
    var Version: string;
    var Http: {
        BaseUrl: string;
        Headers: any;
        AuthorizationHeader: any;
    };
    var Languages: ({
        id: string;
        name: string;
        rtl: boolean;
    } | {
        id: string;
        name: string;
        rtl?: undefined;
    })[];
}
