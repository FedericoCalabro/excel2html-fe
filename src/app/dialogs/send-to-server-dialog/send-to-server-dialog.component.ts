import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscriber } from 'rxjs';
import { ApiService } from 'src/app/commons/api.service';

@Component({
  selector: 'app-send-to-server-dialog',
  templateUrl: './send-to-server-dialog.component.html',
  styleUrls: ['./send-to-server-dialog.component.scss']
})
export class SendToServerDialogComponent implements OnInit {

  form = new FormGroup({
    url : new FormControl("localhost", [Validators.required]),
    port : new FormControl(9999, [Validators.required, Validators.pattern(/^\d+$/)]),
    protocol : new FormControl('ssh', [Validators.required]),
    absPath : new FormControl("C:\\Users\\User\\Desktop", [Validators.required]),
    username : new FormControl("username", [Validators.required]),
    password : new FormControl("password", [Validators.required]),
  })
  hide = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb : FormBuilder,
    private api : ApiService,
    private snackbar : MatSnackBar,
    private dialogRef : MatDialogRef<SendToServerDialogComponent>) {}

  ngOnInit(): void {
  }

  saveConfig(){
    let serverProps = this.form.value;
    this.saveText(JSON.stringify(serverProps), "serverProps.json")
  }

  loadConfig(event: any){
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
        this.form.patchValue(config)
      });
    }
  }

  close(){
    this.dialogRef.close()
  }

  sendToServer(){
    this.api.sendToServer(this.data.id, this.form.value).subscribe(res => {
      this.snackbar.open("File inviato al server indicato", "OK").afterDismissed().subscribe(() => {
        this.dialogRef.close()
      })
    })
  }

  saveText(text : string, filename : string){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }

}
