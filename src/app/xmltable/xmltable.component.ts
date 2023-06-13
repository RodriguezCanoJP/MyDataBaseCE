import { Component } from '@angular/core';

@Component({
  selector: 'app-xmltable',
  templateUrl: './xmltable.component.html',
  styleUrls: ['./xmltable.component.css']
})
export class XmltableComponent{
  public xmlItems: any;
  public displayedColumns: string[] = [];
  
  constructor(){}
  /**
   * @brief se encarga de mostrar la tabla con los archivos
   * @param objects 
   * @param columns 
   * @returns no retorna nada
   */
  showTable(objects: {[s: string]: [v: string]}[], columns: string[]){
    this.xmlItems = objects;
    this.displayedColumns = this.setColumns(columns);
  }
  
  /**
   * 
   * @param columns 
   * @returns 
   */
  setColumns(columns: any){
    let newColumns: string[] = [];
    let keys = Object.keys(this.xmlItems[0]);
    if(columns.length === 1 && columns[0] == "*"){
      keys.forEach(key => newColumns.push(key));
    }else{
      keys.forEach(key => {
        if(columns.includes(key)){
          newColumns.push(key);
        }
      })
    }
    return newColumns;   
  }
}
