import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';

@Directive({
  selector: '[appReadexcel]',
  exportAs: 'readexcel',
})
export class ReadexcelDirective {
  excelObservable!: Observable<any>;
  @Output() eventEmitter = new EventEmitter();

  constructor(
    private snackbar : MatSnackBar
  ) {}

  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
    if(target?.files?.length){
      const file = target.files[0];

      this.excelObservable = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber);
      });

      this.excelObservable.subscribe((d) => {
        this.eventEmitter.emit(d);
      });
    }
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e : any) => {
      const bufferArray = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      subscriber.next(data);
      subscriber.complete();
      this.snackbar.open("Excel file was loaded successfully", "OK")
    };
  }
}
