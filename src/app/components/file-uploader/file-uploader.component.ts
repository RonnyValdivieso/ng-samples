import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

	formData: FormData = new FormData();

	constructor(private fileService: FileService) {	}

	ngOnInit(): void {
	}

	loadFile(event: any): void {
		if (!event.length) {
			return;
		}
		
		const file = <File>event[0];
    this.formData.append('file', file, file.name);
	}

	uploadFile(): void {
		this.fileService.uploadFile(this.formData)
			.subscribe({
				next: (data: any) => {
					this.formData.delete('file');
				},
				error: (error: any) => {
					console.error(error);
				}
			});
	}

}
