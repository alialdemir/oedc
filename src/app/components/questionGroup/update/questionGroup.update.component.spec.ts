import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CurriculumUpdateComponent } from './curriculum.update.component';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSnackBar,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
} from '@angular/material';
describe('CurriculumUpdateComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CurriculumUpdateComponent
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
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = createComponent();
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {
        expect(GetNativeElement().querySelector('h2').textContent).toContain('Bölüm Güncelle');
    }));

    it('should render curriculum name in a input placeholder tag', async(() => {
        expect(GetNativeElement().querySelector('input').getAttribute('placeholder')).toBe('Bölüm adı');
    }));

    it('should render status in a select placeholder tag', async(() => {
        expect(GetNativeElement().querySelector('mat-select').getAttribute('placeholder')).toBe('Durum seçiniz');
    }));

    it('should render save in a button text tag', async(() => {
        expect(GetNativeElement().querySelector('button').textContent).toEqual('Güncelle');
    }));

    it('should render max length in a mat-form-field hintlabel tag', async(() => {
        expect(GetNativeElement().querySelector('mat-form-field').getAttribute('hintlabel')).toBe('Maksimum 100 karakter');
    }));

    function GetNativeElement() {
        const fixture = createComponent();
        fixture.detectChanges();
        return fixture.debugElement.nativeElement;
    }

    function createComponent(): ComponentFixture<CurriculumUpdateComponent> {
        return TestBed.createComponent(CurriculumUpdateComponent);
    }
});
