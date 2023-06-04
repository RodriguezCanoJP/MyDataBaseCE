import { Component, Input } from '@angular/core';
import { ParsingService } from '../parsing.service';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  
  showTable(){
    console.log(this.name);
    this.service.loadXML(this.name).subscribe(data => {  
      this.service.parseXML(data)  
        .then(parsed_data => {  
          this.xmlItems =  parsed_data; 
          this.displayedColumns = Object.keys(this.xmlItems[0]);
        }).catch(err => alert(err));
    })
  
    

  }

  
}
