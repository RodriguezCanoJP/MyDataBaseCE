import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ParsingService } from '../parsing.service';
import { FilesService } from '../files.service';

interface Node {
  name: string;
  children?: Node[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})

export class StoresComponent implements OnInit{
  private files: string[] = [];
  private data: any[] = [];
  private directoryPath = '/path/to/directory';

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private service: ParsingService, private file_service: FilesService) {}

  ngOnInit(): void {
    this.service.loadXML('objeto').subscribe(data => {  
      this.service.getAttributes(data)  
        .then((parsed_data) => {  
          this.data = parsed_data;
          this.dataSource.data = this.data;
        })   
    })
    /*
    const directoryPath = '/assets/';
    this.file_service.getFilesInDirectory(directoryPath).subscribe(
      (files: string[]) => {
        this.files = files;
        console.log(this.files);
      },
      (error: any) => {
        console.error('Error retrieving files:', error);
      }
    );
    */
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
