import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-reactive-form',
	templateUrl: './reactive-form.component.html',
	styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

	profileForm!: UntypedFormGroup;

	constructor() { }

	ngOnInit(): void {
		this.profileForm = new UntypedFormGroup({
			firstName: new UntypedFormControl('', [Validators.required]),
			lastName: new UntypedFormControl('', [Validators.required]),
		});
	}

	onSubmit() {
		// TODO: Use EventEmitter with form value
		console.warn(this.profileForm.value);
	}

	get firstName() { return this.profileForm.get('firstName')!; }

	get lastName() { return this.profileForm.get('lastName')!; }

}
