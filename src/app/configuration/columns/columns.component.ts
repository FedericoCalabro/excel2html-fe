import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExcelManager } from 'src/app/commons/excelManager';
import { Config, DataObj, MergedColumns } from 'src/app/commons/models';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  @Input() dataObj? : DataObj;
  @Input() config! : Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();
  @Output() indexTo = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selectAll(target : string) {
    if(target === 'columns')
      this.config!.columns = this.dataObj?.columns.map(x => x);
    else if(target === 'linkColumns'){
      this.config.linkColumns = this.dataObj?.columns.map(x => x)
      this.updateLinksCols();
    }
    this.configChange.emit(this.config);
  }

  unselectAll(target : string) {
    if(target === 'columns')
      this.config!.columns = [];
    else if(target === 'linkColumns'){
      this.config.linkColumns = []
      this.updateLinksCols();
    }
    this.configChange.emit(this.config);
  }

  updateLinksCols(){
    this.config.linkNames = [...this.config.linkColumns!];
    this.configChange.emit(this.config);
  }


  mergedColumns : MergedColumns[] = [];
  index = 0;
  addNewColMerged(){
    let obj : any = {
      name : `Merged-${this.index++}`,
      mergedFrom : []
    }
    this.mergedColumns = [...this.mergedColumns, obj]
  }
  removeMerged(i : number){
    this.mergedColumns = this.mergedColumns.filter((value, index) => index != i);
    this.mergedToNormals();
  }

  mergedToNormals() {
    for (let i = 0; i < this.mergedColumns.length; i++) {
      const merged = this.mergedColumns[i];
      if(merged.mergedFrom!.length <= 1)
        return console.log(merged.name + " should have at least 2 cols merging from!")
    }

    let copy = [...this.dataObj?.columns!, ...this.mergedColumns.map((merged) => merged.name)];
    if(new Set(copy).size !== copy.length)
      return console.log("cannot have same cols name!")

    this.config.columns = [...copy]
    this.config.mergedColumns = [...this.mergedColumns]
    this.configChange.emit(this.config);
    return true;
  }
}
