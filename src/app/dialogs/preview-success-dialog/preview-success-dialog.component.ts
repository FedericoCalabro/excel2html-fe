import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview-success-dialog',
  templateUrl: './preview-success-dialog.component.html',
  styleUrls: ['./preview-success-dialog.component.scss']
})
export class PreviewSuccessDialogComponent implements OnInit {

  @ViewChild('tooltip') tooltip!: MatTooltip;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clipboard : Clipboard,
    private dialogRef : MatDialogRef<PreviewSuccessDialogComponent>) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.tooltip.hide();
    this.tooltip.disabled = true;
  }
  
  copyToClipboard(){
    const url = window.location.href.split("/home")[0]+`/generation?id=${this.data.id}`
    this.clipboard.copy(url);
    this.tooltip.disabled = false;
    this.tooltip.show();
  }

  ok(){
    this.dialogRef.close();
  }

}
