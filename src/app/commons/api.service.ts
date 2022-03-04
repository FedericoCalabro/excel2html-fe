import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FileResponse, Generation } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost:8080";

  constructor(private http : HttpClient) { }

  public generate(generation : Generation) {
    const URL = `${this.baseUrl}/generate`
    return this.http.post(URL, generation);
  }

  public get(id : string) {
    const URL = `${this.baseUrl}/get?id=${id}`
    return this.http.post(URL, {});
  }

  private getFilRes(id : string){
    const URL = `${this.baseUrl}/download?id=${id}`
    return this.http.post(URL, {}, {responseType: 'blob', observe: 'response'}).pipe(map(res => {
      return new FileResponse({
        filename : res.headers.get("filename")!,
        blob : res.body
      })
    }));
  }

  public download(id : string){
    this.getFilRes(id).subscribe((res : any) => {
      console.log(res)
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

}
