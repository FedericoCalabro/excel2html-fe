import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import html2canvas from 'html2canvas';
import { map, Observable } from 'rxjs';
import { PreviewSuccessDialogComponent } from '../dialogs/preview-success-dialog/preview-success-dialog.component';
import { Config, DataObj, FileResponse, Generation, GenerationEntity } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost:8080";

  constructor(
    private http : HttpClient,
    private dialog : MatDialog,
    private snackbar : MatSnackBar
    ) { }

  public generate(generation : Generation) {
    const URL = `${this.baseUrl}/generate`
    return this.http.post(URL, generation);
  }

  public get(id : string) {
    const URL = `${this.baseUrl}/get?id=${id}`
    return this.http.post(URL, {});
  }

  public sendToServer(id : string, config : any) {
    const URL = `${this.baseUrl}/sendToServer?id=${id}`
    return this.http.post(URL, config);
  }

  public getFilRes(what : string, id : string){
    const URL = `${this.baseUrl}/download/${what}?id=${id}`
    return this.http.post(URL, {}, {responseType: 'blob', observe: 'response'}).pipe(map(res => {
      return new FileResponse({
        filename : res.headers.get("filename")!,
        blob : res.body
      })
    }));
  }

  downloadFile(filename : string, url : string){
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  public preview(dataObj : DataObj, config : Config){
    if(this.checkAllStuffCompiled(dataObj, config)){
      let generation: Generation = new Generation({ data: dataObj.data, config: config });
      this.generate(generation).subscribe((entity : GenerationEntity) => {
          this.dialog.open(PreviewSuccessDialogComponent, {disableClose: true, data: {id: entity.id}}).afterClosed().subscribe(() => {
            window.open(`/generation?id=${entity.id}`, '_blank')
          })
      })
    }
  }

  private checkAllStuffCompiled(dataObj : DataObj, config : Config) : boolean {
    if(config.cardHeaderConfig?.link && config.view === 'CARD'){
      if(!config.cardHeaderConfig.linkDisplayColumn || !config.cardHeaderConfig.linkValueColumn){
        this.snackbar.open("Link Display Column AND Link Value Column are mandatory if your header is link", "OK")
        return false;
      }
    }

    if(config.view === 'PLOT'){
      if(!config.plotConfig.blockedCol || !config.plotConfig.targetCol){
        this.snackbar.open("Please Select a Blocked AND a Target Col in Graphics Tab", "OK")
        return false;
      }
      if(!config.plotConfig.labelX || !config.plotConfig.labelY){
        this.snackbar.open("Label X AND Label Y should not be empty values", "OK")
        return false;
      }
    }

    return true;
  }

}
