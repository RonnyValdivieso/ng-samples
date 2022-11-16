import { AfterViewInit, Component, OnInit } from '@angular/core';
import Player from "@vimeo/player";

@Component({
	selector: 'app-vimeo-player',
	templateUrl: './vimeo-player.component.html',
	styleUrls: ['./vimeo-player.component.css']
})
export class VimeoPlayerComponent implements OnInit, AfterViewInit {

	constructor() { }

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		var player = new Player('video', {
			id: 761222924
		});

		player.on('pause', () => console.log('Paused'));

		player.on('ended', () => console.log('Finished'));
	}

}
