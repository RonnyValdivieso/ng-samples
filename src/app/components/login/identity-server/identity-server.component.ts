import { Component, OnInit } from '@angular/core';
import { OidcAuthService } from 'src/app/services/oidc-auth.service';

@Component({
	selector: 'app-identity-server',
	templateUrl: './identity-server.component.html',
	styleUrls: ['./identity-server.component.css']
})
export class IdentityServerComponent implements OnInit {

	constructor(private authService: OidcAuthService) { }

	ngOnInit(): void {
		this.authService.completeSignIn().then((value) => {
      console.log(value);
    });
	}

	checkLogin() {
		const isLoggenId = this.authService.isLoggedIn();
		console.log(isLoggenId);
	}

	login() {
		this.authService.signIn()
			.then((data: any) => {
				console.log(data);
			});
	}

	getToken() {}

	callApi() {}

}
