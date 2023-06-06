import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ScriptService } from './script.service';
import { XmltableComponent } from './xmltable/xmltable.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'mydatabase';

  public script = '' ;
  commands: any;
  @ViewChild(XmltableComponent)
  tableComponentRef!: XmltableComponent;

  constructor(private service: ScriptService){}

  

  sendRequest(){
    this.service.readScript(this.script).then(arr =>{
      this.commands = arr;
      this.tableComponentRef.showTable(this.commands[1], this.commands[2], this.commands[3], this.commands[4], this.commands[5], this.commands[6])
    }).catch(err => alert(err));
  }
}