import { Component, OnInit, ViewChild } from '@angular/core';
import { DataObj, Config, HtmlObj } from '../commons/models';
import { ColumnsComponent } from './columns/columns.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  dataObj? : DataObj;
  config = new Config({});
  htmlObj? : HtmlObj;
  index : number = 0;

  @ViewChild('columns') columnsCP! : ColumnsComponent;
  @ViewChild('rows') rowsCp! : ColumnsComponent;
  @ViewChild('graphics') graphicsCp! : ColumnsComponent;

  constructor(
  ) { }

  ngOnInit(): void {}

  tabChange(event : any){
  }

  reset(){
    this.columnsCP.mergedColumns = [];
    this.config = new Config({
      columns: this.dataObj?.columns
    });
  }

}
