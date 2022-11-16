import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.isSignedIn();
	}

	isSignedIn(): Observable<boolean> {
		return this.authService.isSignedIn().pipe(
			map((isSignedIn) => {
				if (!isSignedIn) {
					this.router.navigate(['signin']);
					return false;
				}
				return true;
			}));
	}
}
