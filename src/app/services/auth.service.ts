import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserClaim } from '../interfaces/user-claim';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	public signIn(email: string, password: string) {
		return this.http.post<Response>('api/auth/signin', {
			email: email,
			password: password
		});
	}

	public signOut() {
		return this.http.get('api/auth/signout');
	}

	public user() {
		return this.http.get<UserClaim[]>('api/auth/user');
	}

	public isSignedIn(): Observable<boolean> {
		return this.user().pipe(
			map((userClaims) => {
				const hasClaims = userClaims.length > 0;
				return !hasClaims ? false : true;
			}),
			catchError((error) => {
				return of(false);
			}));
	}
}
