import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {}

  tabChange(event : any){
  }

  reset(view? : "TABLE" | "CARD" | "PIVOT"){
    console.log(view)
    this.columnsCP.mergedColumns = [];
    this.config = new Config({
      columns: this.dataObj?.columns
    });
    if(view)
      this.config.view = view;
    
    this.snackBar.open("Configuration Resetted", "OK")
  }

}
