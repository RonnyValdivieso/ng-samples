import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ios-styles',
	templateUrl: './ios-styles.component.html',
	styleUrls: ['./ios-styles.component.css']
})
export class IosStylesComponent implements OnInit {

	media1024: boolean = window.matchMedia("(min-width: 1024px)").matches;
	sources: Array<any> = [
		{
			url: "https://brandbot-storage.s3.amazonaws.com/Medicamenta/adi/e24fd7e6-431c-4f0c-aa56-f192f467f925.webm",
			type: "video/webm",
			codecs: ""
		},
		{
			url: "https://brandbot-storage.s3.amazonaws.com/Medicamenta/adi/29409d85-abfc-478f-87f6-95220f4e122c.mp4",
			type: "video/mp4",
			codecs: "hvc1"
		}
	];

	constructor() { }

	ngOnInit(): void {
	}

}
