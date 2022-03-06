import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { PreviewSuccessDialogComponent } from '../configuration/preview-success-dialog/preview-success-dialog.component';
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

  private getFilRes(what : string, id : string){
    const URL = `${this.baseUrl}/download/${what}?id=${id}`
    return this.http.post(URL, {}, {responseType: 'blob', observe: 'response'}).pipe(map(res => {
      return new FileResponse({
        filename : res.headers.get("filename")!,
        blob : res.body
      })
    }));
  }

  public download(what : string, id : string){
    this.getFilRes(what, id).subscribe((res : any) => {
      let url = window.URL.createObjectURL(res.blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
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
    if(config.cardHeaderConfig?.isLink && config.view === 'CARD'){
      if(!config.cardHeaderConfig.linkDisplayColumn || !config.cardHeaderConfig.linkValueColumn){
        this.snackbar.open("Link Display Column AND Link Value Column are mandatory if your header is link", "OK")
        return false;
      }
    }

    return true;
  }

}
