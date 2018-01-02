import { TestBed, async } from '@angular/core/testing';
import { DepartmentAddComponent } from './department.add.component';
import { DepartmentService } from '../../../shared/services/department.service';
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
describe('DepartmentAddComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DepartmentAddComponent
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
                { provide: DepartmentService, useValue: {} },
                { provide: CurriculumService, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: MatSnackBar, useValue: {} }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = createComponent();
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {
        expect(GetNativeElement().querySelector('h2').textContent).toContain('Program Ekle');
    }));

    it('should render curriculum name in a input placeholder tag', async(() => {
        expect(GetNativeElement().querySelector('input').getAttribute('placeholder')).toBe('Program adı');
    }));

    it('should render curriculum in a select placeholder tag', async(() => {
        expect(GetNativeElement().querySelectorAll('mat-select')[0].getAttribute('placeholder')).toBe('Bölüm seçiniz');
    }));

    it('should render status in a select placeholder tag', async(() => {
        expect(GetNativeElement().querySelectorAll('mat-select')[1].getAttribute('placeholder')).toBe('Durum seçiniz');
    }));

    it('should render save in a button text tag', async(() => {
        expect(GetNativeElement().querySelector('button').textContent).toEqual('Kaydet');
    }));

    it('should render max length in a mat-form-field hintlabel tag', async(() => {
        expect(GetNativeElement().querySelector('mat-form-field').getAttribute('hintlabel')).toBe('Maksimum 100 karakter');
    }));
    function GetNativeElement() {
        const fixture = createComponent();
        fixture.detectChanges();
        return fixture.debugElement.nativeElement;
    }
    function createComponent() {
        return TestBed.createComponent(DepartmentAddComponent);
    }
});
