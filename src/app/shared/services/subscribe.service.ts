import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
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
