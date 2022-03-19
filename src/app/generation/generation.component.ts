import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { ApiService } from '../commons/api.service';
import { Config, FileResponse, GenerationEntity, HtmlObj } from '../commons/models';
import { SendToServerDialogComponent } from '../dialogs/send-to-server-dialog/send-to-server-dialog.component';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss']
})
export class GenerationComponent implements OnInit {

  generation?: GenerationEntity;
  id?: string;
  loading: boolean = true;

  constructor(
    private api: ApiService,
    private activatedSnap: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = this.activatedSnap.snapshot.queryParams['id'];

    if (this.id)
      this.api.get(this.id).subscribe(generation => {
        this.generation = generation
        let config: Config = JSON.parse(this.generation.config || '')
        if (config.view === 'PLOT') {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } else {
          this.loading = false;
        }
      })
  }

  public download(what: string) {
    if (what === 'photo') {
      let screen = document.getElementById('screen')!
      html2canvas(screen).then(canvas => {
        let img = document.createElement('img');
        document.body.appendChild(img)
        img.setAttribute('style', 'display: none');
        img.src = canvas.toDataURL()

        this.api.downloadFile("screen.png", canvas.toDataURL('image/png'))
        img.remove()
      });
    }
    else {
      this.api.getFilRes(what, this.id!).subscribe((res: any) => {
        let url = window.URL.createObjectURL(res.blob);
        this.api.downloadFile(res.filename, url)
      })
    }
  }

  sendToServer() {
    let config : MatDialogConfig = {
      disableClose: true,
      data: {id: this.id},
      width: '500px',
      height: 'auto'
    }
    this.dialog.open(SendToServerDialogComponent, config)
  }


}
