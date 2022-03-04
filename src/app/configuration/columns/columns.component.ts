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

  constructor(
    private snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  selectAll() {
    this.config.columns = this.dataObj?.columns.map(x => x)!;
    this.configChange.emit(this.config);
  }

  unselectAll() {
    this.config!.columns = [];
    this.configChange.emit(this.config);
  }


  mergedColumns : MergedColumns[] = [];
  index = 0;
  addNewColMerged(){
    let nd = this.config.view === "CARD" ? `Merged-${this.index}:{{1}} - {{2}}` : `Merged-${this.index++}`
    let obj : any = {
      nameDefinition : nd,
      mergedFrom : []
    }
    this.mergedColumns = [...this.mergedColumns, obj]
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
    this.configChange.emit(this.config);
    return true;
  }
}
