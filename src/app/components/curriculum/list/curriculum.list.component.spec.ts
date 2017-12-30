import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CurriculumListComponent } from './curriculum.list.component';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from '../../../shared/services/message.service';
import {
    MatDialogRef,
    MatSnackBar,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
} from '@angular/material';
describe('CurriculumListComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CurriculumListComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatIconModule,
                MatInputModule,
                MatSelectModule,
                BrowserAnimationsModule,
            ],
            providers: [
                { provide: CurriculumService, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: MatSnackBar, useValue: {} },
                { provide: MessageService, useValue: {} }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = createComponent();
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    function element(selectorName) {
        const fixture = createComponent();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        return compiled.querySelector(selectorName);
    }

    function createComponent(): ComponentFixture<CurriculumListComponent> {
        return TestBed.createComponent(CurriculumListComponent);
    }
});
