import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private _http: HttpClient) {}

  /**
   * @brief busca y retorna los archivos en un directorio dado
   * @param directoryPath 
   * @returns 
   */
  getFilesInDirectory(directoryPath: string) {
    return this._http.get<string[]>('', { params: { path: directoryPath } });
  }
}
