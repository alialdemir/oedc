import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CurriculumListComponent } from './curriculum.list.component';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import {
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatChipsModule,
    MatListModule,
} from '@angular/material';

describe('CurriculumListComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CurriculumListComponent
            ],
            imports: [
                MatIconModule,
                MatInputModule,
                MatToolbarModule,
                MatTableModule,
                MatDialogModule,
                MatSnackBarModule,
                MatPaginatorModule,
                MatButtonModule,
                MatMenuModule,
                MatChipsModule,
                MatListModule,
            ],
            providers: [
                { provide: CurriculumService, useValue: {} },
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

    function createComponent(): ComponentFixture<CurriculumListComponent> {
        return TestBed.createComponent(CurriculumListComponent);
    }
});
