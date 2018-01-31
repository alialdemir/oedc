import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SubscribeService, JwtService } from '../../shared/services/index';

@Injectable()
export class AuthMiddleware implements CanActivate {

    constructor(
        private router: Router,
        private jwtService: JwtService,
        private subscribeService: SubscribeService
    ) { }

    loginControl(): boolean {
        return this.jwtService.getToken() !== undefined;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginControl()) {
            // logged in so return true
            this.subscribeService.publish('login', true);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
