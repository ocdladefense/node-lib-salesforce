import HttpClient from '@ocdla/lib-http/HttpClient.js';


/**
 * @module SalesforceRestApi
 * @classdesc This module is to be used to interface with the Salesforce API using a RESTful architecture.
 */
export default class SalesforceRestApi extends HttpClient {
    instanceUrl;


    accessToken;


    path;


    method;


    headers;


    body;




    /**
     * Represents the Salesforce API version being used.
     * @static
     * */
    static API_VERSION = 'v60.0';
    /**
     * Represents the base Salesforce API endpoint used for http requests.
     * @static
     * */
    static BASE_URL = '/services/data/' + SalesforceRestApi.API_VERSION + '/';


    /**
     * Represents this API that interfaces with the Salesforce API.
     * @constructor
     * @param {string} instanceUrl - The
     * @param {string} accessToken - The
    */
    constructor(instanceUrl, accessToken) {
        super();
        this.instanceUrl = instanceUrl;
        this.accessToken = accessToken;
        this.headers = new Headers();
        let authHeader = "Bearer " + this.accessToken;
        this.headers.append("Authorization", authHeader);
        this.headers.append('Content-Type', 'application/json');
    }


    /**
     * @param {string} queryString - The SQL query.
     * @returns {object}
     * @example
     * "SELECT Name,Id FROM Object_Name"
    */
    async query(queryString) {


        this.method = 'GET';
        this.path = SalesforceRestApi.BASE_URL + 'query?q=' + queryString;


        let resp = await this.send();


        // if (["PATCH", "DELETE"].includes(this.method)) {
        //     return resp.then(resp => resp.ok);
        // }


        return await resp.json();
        // .then((json) => {
        //     if (json.errorCode != null) {
        //         console.log(json.errorCode);
        //     }
        //     return json;
        // })
        // .catch((err) => {
        //     console.error('Error:', err);
        // });


    }


    /**
    * @param {string} resourceId - The SQL query.
    * @returns {object}
    * @example
    * "SELECT Name,Id FROM Object_Name"
    */
    async access(resourceId) {


        this.method = 'GET';
        this.path = "/services/apexrest/api/media/access/" + resourceId;


        return await this.send();
    }


    /**
    * @param {string} resourceId - The SQL query.
    * @returns {object}
    */
    async purchase(resourceId) {

        this.method = 'POST';
        this.path = "/services/apexrest/api/media/" + resourceId + "/purchase";


        return await this.send();
    }


    /**
     * @param {string} objectName
     * @param {object} record
     * @returns {object}
    */
    create(objectName, record) {
        this.method = 'POST';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName;
        this.body = JSON.stringify(record);


        return this.send();
    }


    /**
     * @param {string} objectName
     * @param {object} record
     * @returns {object}
    */
    update(objectName, record) {
        this.method = 'PATCH';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName + `/${record.Id}`;
        delete record.Id;
        this.body = JSON.stringify(record);


        return this.send();
    }




    /**
     * @param {string} objectName
     * @param {object} record
     * @returns {object}
    */
    upsert(objectName, record, idField = "Id") {
        let idValue = record[idField];
        this.method = 'PATCH';
        let basePath = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName;


        if (idField == "Id") {
            basePath += `/${idValue}`;
        } else {
            basePath += `/${idField}/${encodeURIComponent(idValue)}`;
        }


        this.path = basePath;


        // Always remove the id field (or external id field) from the payload.
        // Otherwise = 400 Bad Request.
        delete record[idField];


        this.body = JSON.stringify(record);


        return this.send();
    }


    /**
     * @param {string} objectName
     * @param {object} record
     * @returns {object}
    */
    delete(objectName, record) {
        this.method = 'DELETE';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName + `/${record}`;


        return this.send();
    }


    /**
     * @returns {object}
    */
    send() {
        let config = {
            method: this.method,
            headers: this.headers
        };


        if (["GET", "DELETE"].includes(this.method) == false) {
            config.body = this.body;
        }


        const req = new Request(this.instanceUrl + this.path, config);


        return super.send(req);






    }
}



