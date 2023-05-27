import { Component, OnInit } from '@angular/core';
import { ParsingService } from '../parsing.service';

@Component({
  selector: 'app-xmltable',
  templateUrl: './xmltable.component.html',
  styleUrls: ['./xmltable.component.css']
})
export class XmltableComponent implements OnInit{
  public xmlItems: any;

  constructor(private service: ParsingService){}

  ngOnInit(): void {
    this.service.loadXML().subscribe(data => {  
      this.service.parseXML(data)  
        .then(parsed_data => {  
           this.xmlItems =  parsed_data;  
        });  
    });
  }
}
