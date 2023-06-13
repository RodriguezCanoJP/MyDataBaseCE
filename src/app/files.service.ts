import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private _http: HttpClient) {}

  getFilesInDirectory(directoryPath: string) {
    return this._http.get<string[]>('', { params: { path: directoryPath } });
  }
}
