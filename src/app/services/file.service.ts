import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private httpClient: HttpClient) { }

	uploadFile(file: any): Observable<any> {
		return this.httpClient.post("https://localhost:7219/api/Storage/UploadFile?projectId=default", file);
	}
}
