import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TOOLTIP_DEFINITIONS } from 'src/app/commons/constants';
import { Config, DataObj, MergedColumns } from 'src/app/commons/models';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  TOOLTIP_DEFINITION = TOOLTIP_DEFINITIONS;

  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();
  @Output() indexTo = new EventEmitter<any>();

  
  mergedColumns : MergedColumns[] = [];
  index = 0;

  constructor(
    private snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  selectAll() {
    this.config.columns = this.dataObj?.columns.map(x => x)!;
    this.config.themeColor = new Array(this.config.columns.length).fill("#ffffff");
    this.config.textColor = new Array(this.config.columns.length).fill("#000000");
    this.configChange.emit(this.config);
  }

  unselectAll() {
    this.config!.columns = [];
    this.config.themeColor = [];
    this.config.textColor = [];
    this.configChange.emit(this.config);
  }

  addNewColMerged(){
    let nd = this.config.view === "CARD" ? `Merged-${this.index}: {{1}} - {{2}}` : `Merged-${this.index++}`
    let obj : any = {
      nameDefinition : nd,
      mergedFrom : []
    }
    this.mergedColumns = [...this.mergedColumns, obj]
    this.index++
    console.log(this.mergedColumns)
  }
  removeMerged(i : number){
    this.mergedColumns = this.mergedColumns.filter((value, index) => index != i);
    this.mergedToNormals();
  }

  mergedToNormals() {
    for (let i = 0; i < this.mergedColumns.length; i++) {
      const merged = this.mergedColumns[i];
      if(merged.mergedFrom!.length <= 1)
        return this.snackbar.open(merged.nameDefinition + " should have at least 2 columns merging from!", "OK")
    }

    let copy = [...this.dataObj?.columns!];
    copy = copy.filter(col => this.config.columns.includes(col))
    copy = [...copy, ...this.mergedColumns.map(merged => merged.nameDefinition!)]

    if(new Set(copy).size !== copy.length)
      return this.snackbar.open("cannot have columns with the same name!", "OK")

    this.config.columns = [...copy]
    this.config.mergedColumns = [...this.mergedColumns]

    this.config.themeColor = new Array(this.config.columns.length).fill("#ffffff");
    this.config.textColor = new Array(this.config.columns.length).fill("#000000");

    this.configChange.emit(this.config);
    return true;
  }

  removeCol(index : number){
    if(index == -1){
      this.config!.textColor = [];
      this.config.themeColor = [];
    }
    else{
      this.config.textColor.splice(index, 1);
      this.config.themeColor.splice(index, 1);
    }
    this.configChange.emit(this.config)
  }

  addCol(event : any){
    this.config!.textColor = [...this.config!.textColor, "#000000"];
    this.config.themeColor = [...this.config.themeColor, "#ffffff"];
    this.configChange.emit(this.config)
  }
}
