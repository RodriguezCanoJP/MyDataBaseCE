import { Component, ViewChild } from '@angular/core';
import { XmltableComponent } from '../xmltable/xmltable.component';
import { ScriptService } from '../script.service';
import { ParsingService } from '../parsing.service';
import { ObjectService } from '../object.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public script = '' ;
  private commands: any;
  public isDisabled: boolean = true;
  private file: any;
  private loaded_files: any[] = [];
  private loaded_titles: string[] = [];
  @ViewChild(XmltableComponent)
  private tableComponentRef!: XmltableComponent;

  constructor(private service: ScriptService, private parsing_service: ParsingService, private object_service: ObjectService){}
  /**
   * @brief envia la solicitud para poder ver el archivo
   * @param no recibe parametros
   * @returns no retorna nada
   */
  sendRequest(){
    this.service.readScript(this.script).then(arr =>{
      this.commands = arr;
      if(this.loaded_titles.includes(this.commands[1])){
        let idx = this.loaded_titles.indexOf(this.commands[1]);
        if(this.commands[0] == 'select'){
          this.tableComponentRef.showTable(this.object_service.selectFromObject(this.loaded_files[idx], this.commands[3], this.commands[4], this.commands[5], this.commands[6]), this.commands[2])
        }else if(this.commands[0] == 'insert'){
          this.isDisabled = false
          this.object_service.insertObject(this.loaded_files[idx], this.commands[2], this.commands[3]);
        }else if(this.commands[0] == 'update'){
          this.isDisabled = false
          this.object_service.updateObject(this.loaded_files[idx], this.commands[2], this.commands[3], this.commands[4], this.commands[5], this.commands[6])
        }else if(this.commands[0] == 'delete'){
          this.isDisabled = false
          this.object_service.deleteObject(this.loaded_files[idx], this.commands[2], this.commands[3], this.commands[4]);
        }
      }else{
        this.parsing_service.loadXML(this.commands[1]).subscribe(data => {  
          this.parsing_service.parseXML(data)  
            .then(parsed_data => {  
              this.file = parsed_data
              if(this.commands[0] == 'select'){
                this.tableComponentRef.showTable(this.object_service.selectFromObject(this.file, this.commands[3], this.commands[4], this.commands[5], this.commands[6]), this.commands[2])
              }else if(this.commands[0] == 'insert'){
                this.isDisabled = false
                this.object_service.insertObject(this.file, this.commands[2], this.commands[3]);
              }else if(this.commands[0] == 'update'){
                this.isDisabled = false
                this.object_service.updateObject(this.file, this.commands[2], this.commands[3], this.commands[4], this.commands[5], this.commands[6])
              }else if(this.commands[0] == 'delete'){
                this.isDisabled = false
                this.object_service.deleteObject(this.file, this.commands[2], this.commands[3], this.commands[4]);
              }
              this.loaded_files.push(this.file);
              this.loaded_titles.push(this.commands[1]);
            }).catch(err => alert(err));
        })
      }
    }).catch(err => alert(err));
  }
  /**
   * @brief envia los cambios
   * @param no recibe parametros
   * @returns no retorna nada
   */
  commit(){
    console.log(this.loaded_files);
    this.loaded_files.forEach(file => {
      this.parsing_service.createXML(file, "Employee");
    }) 
    this.isDisabled = true;
  }


}
