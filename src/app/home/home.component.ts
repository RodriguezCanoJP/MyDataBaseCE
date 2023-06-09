import { Component, ViewChild } from '@angular/core';
import { XmltableComponent } from '../xmltable/xmltable.component';
import { ScriptService } from '../script.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public script = '' ;
  private commands: any;
  private isDisabled: boolean = true;

  @ViewChild(XmltableComponent)
  private tableComponentRef!: XmltableComponent;

  constructor(private service: ScriptService){}

  sendRequest(){
    this.service.readScript(this.script).then(arr =>{
      this.commands = arr;
      if(this.commands[0] == 'select'){
        this.tableComponentRef.showTable(this.commands[1], this.commands[2], this.commands[3], this.commands[4], this.commands[5], this.commands[6])
      }else if(this.commands[0] == 'insert'){
        this.isDisabled = true;
        this.tableComponentRef.printXML();
      }
      
    }).catch(err => alert(err));
  }
}
