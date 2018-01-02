/*
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DepartmentListComponent } from './department.list.component';
import { DepartmentService } from '../../../shared/services/department.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatDialogRef,
    MatSnackBar,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbar,
    MatToolbarModule,
    MatToolbarRow,
} from '@angular/material';
describe('DepartmentListComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DepartmentListComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatIconModule,
                MatInputModule,
                MatSelectModule,
                MatToolbar,
                MatToolbarModule,
                MatToolbarRow,
                BrowserAnimationsModule,
            ],
            providers: [
                { provide: DepartmentService, useValue: {} },
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

   function GetNativeElement() {
        const fixture = createComponent();
        fixture.detectChanges();
        return fixture.debugElement.nativeElement;
    }

    function createComponent(): ComponentFixture<DepartmentListComponent> {
        return TestBed.createComponent(DepartmentListComponent);
    }
});
 */