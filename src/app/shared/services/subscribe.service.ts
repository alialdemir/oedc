import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';

interface Message {
    key: string;
    data: any;
}

type MessageCallback = (data: any) => void;

@Injectable()
export class SubscribeService {
    private subject = new Subject<Message>();
    Publish(key: string, data?: any) {
        this.subject.next({ key, data });
    }

    Subscribe(type: string, callback: MessageCallback): Subscription {
        return this.subject
            .filter(message => message.key === type)
            .map(message => message.data)
            .subscribe(callback);
    }
}
