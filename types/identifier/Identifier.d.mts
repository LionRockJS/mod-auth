export default class Identifier {
    static Model: typeof import("@lionrockjs/central").Model;
    static isPostDataContainsIdentifierField(postData: any): boolean;
    static getName(postData: any): Promise<any>;
    static registerFilter(modelInstance: any, postData: any, state?: {}): Promise<any>;
    static loginFilter(modelInstance: any, postData: any, state?: {}): Promise<any>;
}
