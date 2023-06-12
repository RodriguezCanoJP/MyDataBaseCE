import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor() { }

  selectFromObject(objects: {[s: string]: [v: string]}[], conditions: string[], l_operators: string[], operators: string[], values: string[]){
    var filtered_object: any[] = [];
    objects.forEach((obj: { [s: string]: [v: string] }) =>{
      if(conditions.length > 0 && values.length === conditions.length){
        for(let i=0; i < conditions.length; i++){
          let op = operators[i];
          if(op === "="){
            if(obj[conditions[i]][0].toLowerCase() === values[i]){
              filtered_object.push(obj);
            }
          }else if(op === ">"){
            let cond:number = +obj[conditions[i]][0];
            let val: number = + values[i];
            if(cond > val){
              filtered_object.push(obj);
            }
          }else if(op === "<"){
            let cond:number = +obj[conditions[i]][0];
            let val: number = + values[i];
            if(cond < val){
              filtered_object.push(obj);
            }
          }else if(op === "<="){
            let cond:number = +obj[conditions[i]][0];
            let val: number = + values[i];
            if(cond <= val){
              filtered_object.push(obj);
            }
          }else if(op === ">="){
            let cond:number = +obj[conditions[i]][0];
            let val: number = + values[i];
            if(cond >= val){
              filtered_object.push(obj);
            }
          }
        }
      }else{
        filtered_object.push(obj);
      }
    }) 
    return filtered_object; 
  }

  insertObject(objects: {[s: string]: [v: string]}[], conditions: string[], values: string[]){
    const obj = JSON.parse(JSON.stringify(objects[0]));
    Object.keys(obj).forEach((i) => obj[i] = "null");
    for (let i = 0; i < conditions.length; i++) {
      obj[conditions[i]] = values[i];
    }
    objects.push(obj);
  }

  updateObject(objects: {[s: string]: [v: string]}[], columns: string[], values: string[], conditions: string, operator: string, where_value: string){
    objects.forEach(obj => {
      for (let i = 0; i < columns.length; i++) {
        if(operator === "="){
          if(obj[conditions][0].toLowerCase() === where_value){
            obj[columns[i]][0] = values[i];
          }
        }else if(operator === ">"){
          let cond: number =+ obj[conditions][0];
          let val: number =+ where_value;
          if(cond > val){
            obj[columns[i]][0] = values[i];
          }
        }else if(operator === "<"){
          let cond:number =+ obj[conditions][0];
          let val: number =+ where_value;
          if(cond < val){
            obj[columns[i]][0] = values[i];
          }
        }else if(operator === "<="){
          let cond:number = +obj[conditions][0];
          let val: number = + where_value;
          if(cond <= val){
            obj[columns[i]][0] = values[i];
          }
        }else if(operator === ">="){
          let cond:number = +obj[conditions][0];
          let val: number = + where_value;
          if(cond >= val){
            obj[columns[i]][0] = values[i];
          }
        }
      }
    })
  }

  deleteObject(objects: {[s: string]: [v: string]}[], condition: string, operator: string, value: string){
    for (let i = 0; i < objects.length; i++) {
      let obj = objects[i];
      if(operator === "="){
        if(obj[condition][0].toLowerCase() === value){
          objects.splice(i, 1);
          i--;
        }
      }else if(operator === ">"){
        let cond: number =+ obj[condition][0];
        let val: number =+ value;
        if(cond > val){
          objects.splice(i, 1);
          i--;
        }
      }else if(operator === "<"){
        let cond:number =+ obj[condition][0];
        let val: number =+ value;
        if(cond < val){
          objects.splice(i, 1);
          i--;
        }
      }else if(operator === "<="){
        let cond:number = +obj[condition][0];
        let val: number = + value;
        if(cond <= val){
          objects.splice(i, 1);
          i--;
        }
      }else if(operator === ">="){
        let cond:number = +obj[condition][0];
        let val: number = + value;
        if(cond >= val){
          objects.splice(i, 1);
          i--;
        }
      } 
    }
  }
}
