import { Injectable } from '@angular/core';


var logic_operations = {
  '=': function (x:string,y:string) { return x.toLocaleLowerCase() === y },
  '>': function (x:string, y:string) { return x > y },
  '<': function (x:string, y:string) { return x < y },
  '>=': function (x:string, y:string) { return x >= y },
  '<=': function (x:string, y:string) { return x <= y },
}​​​​​​​;

type OnlyKeys = keyof typeof logic_operations;

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  

  constructor() { }
  /**
   * @Brief retorna un objeto con las condiciones requridas
   * @param objects 
   * @param conditions 
   * @param l_operators 
   * @param operators 
   * @param values 
   * @returns 
   */
  selectFromObject(objects: {[s: string]: [v: string]}[], conditions: string[], l_operators: string[], operators: OnlyKeys[], values: string[]){
    var filtered_object: any[] = [];
    objects.forEach((obj: { [s: string]: [v: string] }) =>{
      if(conditions.length > 0 && values.length === conditions.length){
        if(l_operators.length == 1 && l_operators[0] == 'and'){
          if(logic_operations[operators[0]](obj[conditions[0]][0],values[0]) && logic_operations[operators[1]](obj[conditions[1]][0],values[1])){
            filtered_object.push(obj);
          }
        }else if(l_operators.length == 1 && l_operators[0] == 'or'){
          if(logic_operations[operators[0]](obj[conditions[0]][0],values[0]) || logic_operations[operators[1]](obj[conditions[1]][0],values[1])){
            filtered_object.push(obj);
          }
        }else if(l_operators.length == 2 && l_operators[0] == 'and' && l_operators[1] == 'and'){
          if(logic_operations[operators[0]](obj[conditions[0]][0],values[0]) && logic_operations[operators[1]](obj[conditions[1]][0],values[1]) && logic_operations[operators[2]](obj[conditions[2]][0],values[2])){
            filtered_object.push(obj);
          }
        }else if(l_operators.length == 2 && l_operators[0] == 'or' && l_operators[1] == 'or'){
          if(logic_operations[operators[0]](obj[conditions[0]][0],values[0]) || logic_operations[operators[1]](obj[conditions[1]][0],values[1]) || logic_operations[operators[2]](obj[conditions[2]][0],values[2])){
            filtered_object.push(obj);
          }
        }else if(l_operators.length == 2 && l_operators[0] == 'or' && l_operators[1] == 'and'){
          if(logic_operations[operators[0]](obj[conditions[0]][0],values[0]) || logic_operations[operators[1]](obj[conditions[1]][0],values[1]) && logic_operations[operators[2]](obj[conditions[2]][0],values[2])){
            filtered_object.push(obj);
          }
        }else if(l_operators.length == 2 && l_operators[0] == 'and' && l_operators[1] == 'or'){
          if(logic_operations[operators[0]](obj[conditions[0]][0],values[0]) && logic_operations[operators[1]](obj[conditions[1]][0],values[1]) || logic_operations[operators[2]](obj[conditions[2]][0],values[2])){
            filtered_object.push(obj);
          }
        }else if(l_operators[0] !== ''){
          if(logic_operations[operators[0]](obj[conditions[0]][0],values[0])){
            filtered_object.push(obj);
          }
        }    
      }else{
        filtered_object.push(obj);
      }
    }) 
    return filtered_object; 
  }
  /**
   * 
   * @param objects 
   * @param conditions 
   * @param values 
   */
  insertObject(objects: {[s: string]: [v: string]}[], conditions: string[], values: string[]){
    const keys = Object.keys(objects[0]);
    const iterations = values.length/keys.length;

    const obj = JSON.parse(JSON.stringify(objects[0]));
    

    keys.forEach((i) => obj[i] = "null");
    for (let i = 0; i < conditions.length; i++) {
      obj[conditions[i]] = values[i];
    }
    objects.push(obj);
  }
  /**
   * @brief actualiza el valor de un objeto
   * @param objects 
   * @param columns 
   * @param values 
   * @param conditions 
   * @param operator 
   * @param where_value 
   */
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
  /**
   * @brief elimina un objeto dado
   * @param objects 
   * @param condition 
   * @param operator 
   * @param value 
   */
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