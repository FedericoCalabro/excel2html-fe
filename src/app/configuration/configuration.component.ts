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
    this.columnsCP.mergedColumns = [];
    this.config = new Config({
      columns: this.dataObj?.columns
    });
    this.config.themeColor = new Array(this.config.columns.length).fill("#ffffff");
    this.config.textColor = new Array(this.config.columns.length).fill("#000000");
    if(view)
      this.config.view = view;
    
    this.snackBar.open("Configuration Resetted", "OK")
  }

  updateConfig(config : Config) : any{
    console.log(this.config)

    console.log("data cols =" + this.dataObj?.columns)

    console.log(config.columns)
    let copy = [...config.columns].filter((col) => !config.mergedColumns?.map(merged => merged.nameDefinition).includes(col))
    console.log(copy)
    for (let i = 0; i < copy.length; i++) {
      const col = copy[i];
      if(!this.dataObj?.columns.includes(col)){
        return this.snackBar.open("Config not valid for this excel", "OK")
      }
    }

    this.config = new Config({...config})
    this.columnsCP.mergedColumns = config.mergedColumns || [];
    console.log(this.config)
    this.snackBar.open("Configuration Loaded successfully", "OK")
  }

}
