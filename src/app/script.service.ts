import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScriptService {

  constructor() { }

  readScript(script: string){
    return new Promise(resolve => {
      var splitted = script.split(/\n| /, 10);
      splitted = splitted.map(element => {
        return element.toLowerCase();
      });
      resolve(splitted);
    }
  )}  
}
