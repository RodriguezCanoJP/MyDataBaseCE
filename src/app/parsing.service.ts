import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ParsingService {

  constructor(private _http: HttpClient) {}

  loadXML(){  
    return this._http.get('/assets/objeto2.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })   
  }  

  parseXML(data: string) {  
    return new Promise(resolve => {  
      var k: Object,  
        arr: any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) { 
        const storeString : string = Object.keys(result)[0];//Main string
        const store = result[storeString];//Store object
        const groupString : string = Object.keys(store)[0];//Store obj string
        const objs = store[groupString];//Objects array

        objs.forEach((obj: { [s: string]: unknown; } | ArrayLike<unknown>) =>{
          arr.push(obj);
        })
      
        resolve(arr);  
      });  
    });  
  }  
}
