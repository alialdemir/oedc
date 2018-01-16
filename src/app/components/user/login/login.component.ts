import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, SubscribeService, JwtService } from '../../../shared/services/index';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {
    public form = new FormGroup({
        email: new FormControl('demo@demo.com', Validators.required),
        password: new FormControl('demo', Validators.required)
    });

    returnUrl = '/yonetim/bolumler';

    private subscribe: Subscription;

    constructor(
        private userService: UserService,
        private snackBar: MatSnackBar,
        private subscribeService: SubscribeService,
        private router: Router,
        private jwtService: JwtService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.subscribe = this.route.queryParams.subscribe(params => {
            const returnUrl = params['returnUrl'];
            if (returnUrl) {
                this.returnUrl = returnUrl;
            }
        });
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    ShowSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
        });
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }
        this.userService
            .SignIn(this.form.value)
            .subscribe(isSuccess => {
                this.ShowSnackBar(isSuccess.message);
                this.jwtService.saveToken(`${isSuccess.token_type} ${isSuccess.token}`);
                this.subscribeService.Publish('login', true);
                this.router.navigate([this.returnUrl]);
            }, err => this.ShowSnackBar(err.error.message));
    }
}
