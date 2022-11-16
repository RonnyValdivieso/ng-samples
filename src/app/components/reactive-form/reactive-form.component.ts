import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-reactive-form',
	templateUrl: './reactive-form.component.html',
	styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

	profileForm!: FormGroup;

	constructor() { }

	ngOnInit(): void {
		this.profileForm = new FormGroup({
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
		});
	}

	onSubmit() {
		// TODO: Use EventEmitter with form value
		console.warn(this.profileForm.value);
	}

	get firstName() { return this.profileForm.get('firstName')!; }

	get lastName() { return this.profileForm.get('lastName')!; }

}
