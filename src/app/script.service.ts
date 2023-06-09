import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScriptService {

  constructor() { }

  /**
   * @Brief divide los elementos en arreglos para procesar la logica facilmente
   * @param commands 
   * @returns 
   */
  sortScript(commands: string[]){
    var columns:string[] = [],
        conditions:string[] = [], 
        logic_operators:string[] = [],
        operators:string[] = [],
        values:string[] = [],
        sorted_commands = [],
        filename: string;

    if(commands[0] === "select"){
      let from_idx = commands.indexOf("from");
      filename = commands[from_idx + 1];
      for(let i=1; i < from_idx; i++){
        columns.push(commands[i]);
      }

      if(commands[from_idx + 2] == "where"){
        let where_idx = commands.indexOf("where");
        let cmmd_left = (commands.length - where_idx) / 4;
        if(cmmd_left !== 0){
          for(let i=where_idx + 4; i < commands.length; i += 4){
            logic_operators.push(commands[i]);
          }
          for(let i=where_idx + 1; i < commands.length; i += 4){
            conditions.push(commands[i]);
          }
          for(let i=where_idx + 2; i < commands.length; i += 4){
            operators.push(commands[i]);
          }
          for(let i=where_idx + 3; i < commands.length; i += 4){
            values.push(commands[i]);
          }
        }
      }
      sorted_commands.push("select");
      sorted_commands.push(filename);
      sorted_commands.push(columns);
      sorted_commands.push(conditions);
      sorted_commands.push(logic_operators);
      sorted_commands.push(operators);
      sorted_commands.push(values);
      
    }
    else if(commands[0] == 'insert' && commands[1] == 'into'){
      let filename = commands[2];
      let values_idx = commands.indexOf('values');
    
      if(values_idx == 3){
        for(let i=3; i<commands.length; i++){
          values.push(commands[i])
        }
      }else{
        for(let i=3; i<values_idx; i++){
          conditions.push(commands[i]);
          values.push(commands[values_idx + i - 2]);
        }
      }
      sorted_commands.push("insert", filename, conditions, values);
    }
    else if(commands[0] == 'update' && commands[2] == 'set'){
      let filename = commands[1];
      let where_idx: number;
      if(commands.includes('where')){
        where_idx = commands.indexOf('where');
        for (let i = 3; i < where_idx; i++) {
          console.log(i);
        }
      }
    }else if(commands[0] == 'delete' && commands[1] == 'from'){
      filename = commands[2];
      if(commands.length > 3 && commands[3] == 'where'){
        sorted_commands.push("delete", filename, commands[4], commands[5], commands[6]);
      }
      sorted_commands.push("delete", filename);
    }
    return sorted_commands;
  }

  /**
   * @Brief Lee un string y lo divide en cadenas cuando esten separadas por un espacio o una nueva linea
   * @param script 
   * @returns void
   */
  readScript(script: string){
    return new Promise(resolve => {
      let splitted: string[] = script.split(/\n| /, 20);
      splitted = splitted.map(element => {
        return element.toLowerCase();
      });
      const sorted_commands = this.sortScript(splitted);

      resolve(sorted_commands);
    }
  )}  
}
