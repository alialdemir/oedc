import { Injectable } from '@angular/core';
@Injectable()
export class JwtService {

    getToken(): string {
        // tslint:disable-next-line:max-line-length
     //  this.saveToken('bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTUwZWIzMmM0M2UzYjBhMTQwYWM0ZjMiLCJpYXQiOjE1MTUyNTI1MzAsImV4cCI6MTUxNjQ2MjEzMH0.9CeMbPdZRHoPL3myzsSiRJG0DJoivkPqmhadm7Kzhmg');
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
