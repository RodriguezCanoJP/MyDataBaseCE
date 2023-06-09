import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

interface Node {
  name: string;
  children?: Node[];
}

@Injectable({
  providedIn: 'root'
})
export class ParsingService {

  constructor(private _http: HttpClient) {}

  /**
   * @brief Esta funcion se encarga de cargar los archivos xml
   * @param file 
   * @returns observer
   */
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

  /**
   * @brief se encargar de obtener los atributos de cada archivo
   * @param data 
   * @returns object[]
   */
  getAttributes(data: string){
    return new Promise<any[]>(resolve => {  
      var arr: any = [],
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) { 
        
        const storeString = Object.keys(result)[0];//Main string
        const store = result[storeString];//Store object
        const groupString : string = Object.keys(store)[0];//Store obj string
        const objs = store[groupString];//Objects array
        
        var children_nodes: Node[] = [];
        const keys = Object.keys(objs[0]);
        
        for (let i = 0; i < keys.length; i++) {
          children_nodes.push({name: keys[i]});
        }
        var obj: Node = {name: storeString, children: children_nodes};
        
        arr.push(obj);
        resolve(arr);  

      })
    })    
  }
  /**
   * @brief Crea un array con los datos del archuvo
   * @param data 
   * @returns object[]
   */
  parseXML(data: string) {  
    return new Promise(resolve => {  
      var arr: any = [],  
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

        

        objs.forEach((obj: { [s: string]: [v: string] }) =>{
          var key:string, keys:string[] = Object.keys(obj);
          var n = keys.length;
          var newobj: any ={};
          while (n--) {
            key = keys[n];
            newobj[key.toLowerCase()] = obj[key];
          }
          arr.push(newobj);
        })
        resolve(arr);  
      });  
    });  
  }  

  /**
   * @brief crea un nuevo archivo xml a partir de un array
   * @param objects 
   * @param store_name 
   * @returns void
   */
  createXML(objects: {[s: string]: [v: string]}[], store_name : string){
    const builder = new xml2js.Builder({rootName: store_name});
    const obj: any = { object : objects };
    const xml = builder.buildObject(obj);   
    var fileObj = new File([xml], '/assets/' + store_name + '.xml');
    
    var reader = new FileReader();
    reader.onload = () => {
      console.log('reader', reader.result);      
    }
    reader.readAsText(fileObj);
  }
}
