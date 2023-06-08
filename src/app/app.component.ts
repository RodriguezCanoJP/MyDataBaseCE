import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ScriptService } from './script.service';
import { XmltableComponent } from './xmltable/xmltable.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  public script = '' ;
  private commands: any;
  @ViewChild(XmltableComponent)
  private tableComponentRef!: XmltableComponent;

  constructor(private service: ScriptService){}

  sendRequest(){
    this.service.readScript(this.script).then(arr =>{
      this.commands = arr;
      if(this.commands[0] == 'select'){
        this.tableComponentRef.showTable(this.commands[1], this.commands[2], this.commands[3], this.commands[4], this.commands[5], this.commands[6])
      }else if(this.commands[0] == 'print'){
        this.tableComponentRef.printXML();
      }
      
    }).catch(err => alert(err));
  }
}