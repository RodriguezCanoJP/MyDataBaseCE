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
      if(this.commands[0] === "select" && this.commands[2]=== "from"){
        this.tableComponentRef.showTable(this.commands[3]);
      }else if(this.commands[0] == "update"){
        console.log("mfer wants to update");
      }else if(this.commands[0] == "delete"){
        console.log("mfer wants to delete");
      }else if(this.commands[0] == "insert"){
        console.log("mfer wants to insert");
      }else{
        alert("Syntax Error");
      }

    }).catch(err => alert(err));
  }
}