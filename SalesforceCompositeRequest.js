


export default class SalesforceCompositeRequest {

    #method = "POST";


    #sObject;
    #body = {};



    getMethod() {
        return this.#method;
    }

    setMethod(method) {
        this.#method = method;
    }


    constructor(sObject) {
        this.#body = {};
        this.#sObject = sObject;
    }

    setBody(body) {
        this.#body = body;
    }

    getBody() {
        return this.#body;
    }

    getSObject() {
        return this.#sObject;
    }

}
