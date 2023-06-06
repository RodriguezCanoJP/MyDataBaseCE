import { Component, Input } from '@angular/core';
import { ParsingService } from '../parsing.service';

@Component({
  selector: 'app-xmltable',
  templateUrl: './xmltable.component.html',
  styleUrls: ['./xmltable.component.css']
})
export class XmltableComponent{
  @Input()
  name!: string;

  public xmlItems: any;
  public displayedColumns: any;
  

  constructor(private service: ParsingService){}
  
  showTable(filename: string, columns: string[], conditions: string[], l_operators: string[], operators: string[], values: string[]){
    this.service.loadXML(filename).subscribe(data => {  
      this.service.parseXML(data, columns, conditions, l_operators, operators, values)  
        .then(parsed_data => {  
          this.xmlItems =  parsed_data; 
          this.displayedColumns = Object.keys(this.xmlItems[0]);
        }).catch(err => alert(err));
    })
  }

  
}
