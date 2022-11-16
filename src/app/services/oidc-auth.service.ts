import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OidcAuthService {

	private config: UserManagerSettings = {
		authority: 'https://localhost:7284',
		client_id: 'ng',
		redirect_uri: 'http://localhost:4200/home',
		post_logout_redirect_uri: 'http://localhost:4200/',
		response_type: "id_token token",
		scope: "openid",
		filterProtocolClaims: true,
		loadUserInfo: true
	};

	private manager = new UserManager(this.config);
	private user?: User;
	private userLoginSubject = new Subject<boolean>();

	constructor() {
		this.manager.getUser().then((user: any) => {
			this.user = user;
			console.log(this.user);
		});
	}

	getUserLoggedInEvents(): Observable<boolean> {
		return this.userLoginSubject.asObservable();
	}

	isLoggedIn(): boolean {
		return this.user != null && !this.user.expired;
	}

	signIn(): Promise<void> {
		return this.manager.signinRedirect();
	}

	completeSignIn(): Promise<void> {
		return this.manager.signinRedirectCallback().then(user => {
			this.user = user;
			console.log(this.user);
			this.userLoginSubject.next(this.isLoggedIn());
		});
	}

	signOut(): Promise<void> {
		return this.manager.signoutRedirect();
	}

	completeSignOut(): Promise<void> {
		return this.manager.signoutRedirectCallback().then((user: any) => {
			// this.user = null;
			this.userLoginSubject.next(this.isLoggedIn());
		});
	}
}
