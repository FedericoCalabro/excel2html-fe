import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscriber } from 'rxjs';
import { TOOLTIP_DEFINITIONS } from 'src/app/commons/constants';
import { ExcelManager } from 'src/app/commons/excelManager';
import { Config, DataObj } from 'src/app/commons/models';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  TOOLTIP_DEFINITION = TOOLTIP_DEFINITIONS;

  @Input() dataObj?: DataObj;
  @Input() config!: Config;

  @Output() dataObjChange = new EventEmitter<DataObj>();
  @Output() configChange = new EventEmitter<Config>();
  @Output() onFileUploaded = new EventEmitter<any>();
  @Output() onConfigUploaded = new EventEmitter<any>();

  @Output() indexTo = new EventEmitter<any>();

  constructor(
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onUpload(data: any[]) {

    let c1 = ExcelManager.checkRowsLength(data);
    if (!c1) return this.snackbar.open("Excel file must at least have 1 row", "OK")

    let c2 = ExcelManager.checkSameColName(data);
    if (!c2) return this.snackbar.open("Excel file cannot have more than 1 column with the same name", "OK")

    let columns: string[] = [...ExcelManager.getColumns(data)];

    this.dataObj = new DataObj({ data, columns })
    this.config.columns = [...columns];

    this.config.themeColor = new Array(this.config.columns.length).fill("#ffffff");
    this.config.textColor = new Array(this.config.columns.length).fill("#000000");

    this.dataObjChange.emit(this.dataObj);
    this.configChange.emit(this.config);
    this.onFileUploaded.emit(true);
  }

  onConfigSelect(event: any) {
    if (event.target?.files?.length) {
      const file = event.target.files[0];

      let obs = new Observable((subscriber: Subscriber<any>) => {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (e: any) {
          let config = JSON.parse(e.target.result)
          subscriber.next(config);
          subscriber.complete();
        }
      });
      obs.subscribe((config) => {
        this.onConfigUploaded.emit(config);
      });
    }
  }

  
}
