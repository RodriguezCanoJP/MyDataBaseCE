import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ParsingService {

  constructor(private _http: HttpClient) {}

  loadXML(file:string){  
    return this._http.get('/assets/' + file + '.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })   
  }  

  parseXML(data: string,columns: string[], conditions: string[], l_operators: string[], operators: string[], values: string[]) {  
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

        objs.forEach((obj: { [s: string]: [v: string]; }) =>{
          if(conditions.length > 0 && values.length === conditions.length){
            for(let i=0; i < conditions.length; i++){
              let op = operators[i];
              if(op === "="){
                if(obj[conditions[i]][0] === values[i]){
                  arr.push(obj);
                }
              }else if(op === ">"){
                let cond:number = +obj[conditions[i]][0];
                let val: number = + values[i];
                if(cond > val){
                  arr.push(obj);
                }
              }else if(op === "<"){
                let cond:number = +obj[conditions[i]][0];
                let val: number = + values[i];
                if(cond < val){
                  arr.push(obj);
                }
              }
            }
          }else{
            arr.push(obj);
          }
        })
        resolve(arr);  
      });  
    });  
  }  
}
