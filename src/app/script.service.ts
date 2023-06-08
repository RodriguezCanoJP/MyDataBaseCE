import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScriptService {

  constructor() { }

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
    return sorted_commands;
  }

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
