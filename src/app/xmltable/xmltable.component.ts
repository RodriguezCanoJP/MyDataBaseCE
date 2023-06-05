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
  
  showTable(filename: string){
    console.log(filename);
    this.service.loadXML(filename).subscribe(data => {  
      this.service.parseXML(data)  
        .then(parsed_data => {  
          this.xmlItems =  parsed_data; 
          this.displayedColumns = Object.keys(this.xmlItems[0]);
        }).catch(err => alert(err));
    })
  }

  
}
