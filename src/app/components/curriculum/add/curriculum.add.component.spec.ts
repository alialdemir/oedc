import { TestBed, async } from '@angular/core/testing';
import { CurriculumAddComponent } from './curriculum.add.component';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatDialogRef,
    MatSnackBar,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
} from '@angular/material';
describe('CurriculumAddComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CurriculumAddComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatIconModule,
                MatInputModule,
                MatSelectModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: CurriculumService, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: MatSnackBar, useValue: {} }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(CurriculumAddComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {
        expect(element('h2').textContent).toContain('Bölüm Ekle');
    }));

    it('should render curriculum name in a input placeholder tag', async(() => {
        expect(element('input').getAttribute('placeholder')).toBe('Bölüm adı');
    }));

    it('should render status in a select placeholder tag', async(() => {
        expect(element('mat-select').getAttribute('placeholder')).toBe('Durum seçiniz');
    }));

    it('should render save in a button text tag', async(() => {
        expect(element('button').textContent).toEqual('Kaydet');
    }));

    it('should render max length in a mat-form-field hintlabel tag', async(() => {
        expect(element('mat-form-field').getAttribute('hintlabel')).toBe('Maksimum 100 karakter');
    }));

    function element(selectorName) {
        const fixture = TestBed.createComponent(CurriculumAddComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        return compiled.querySelector(selectorName);
    }
});
