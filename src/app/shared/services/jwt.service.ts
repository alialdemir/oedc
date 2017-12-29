import { Injectable } from '@angular/core';
@Injectable()
export class JwtService {

    getToken(): string {
        // tslint:disable-next-line:max-line-length
        return window.localStorage['jwtToken'];
    }

    saveToken(token: string) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }

}