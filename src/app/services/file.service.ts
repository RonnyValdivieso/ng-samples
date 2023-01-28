import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private httpClient: HttpClient) { }

	uploadFile(file: any): Observable<any> {
		return this.httpClient.post("https://localhost:7246/api/Storage/UploadFile?projectId=LAWBOT&socialId=5f3cc7ea-74d7-4c74-b4d2-1db67b1c25b2", file);
	}
}
