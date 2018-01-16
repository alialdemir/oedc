import { Routes, RouterModule } from '@angular/router';


// Middleware
import { AuthMiddleware } from '../../shared/middlewares/auth.middleware';

// Components
import {
    CurriculumListComponent,
    DepartmentListComponent,
    LessonListComponent,
    InstructorListComponent,
    QuestionGroupListComponent,
    QuestionListComponent,
    SurveyFormListComponent,
    SurveyFormCodeListComponent,
    LoginComponent,
} from '../index';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Giriş Yap'
        }
    },
    {
        path: 'yonetim/bolumler',
        canActivate: [AuthMiddleware],
        component: CurriculumListComponent,
        data: {
            title: 'Bölümler'
        }
    },
    {
        path: 'yonetim/programlar',
        canActivate: [AuthMiddleware],
        component: DepartmentListComponent,
        data: {
            title: 'Programlar'
        }
    },
    {
        path: 'yonetim/dersler',
        canActivate: [AuthMiddleware],
        component: LessonListComponent,
        data: {
            title: 'Dersler'
        }
    },
    {
        path: 'yonetim/ogretimElemanlari',
        canActivate: [AuthMiddleware],
        component: InstructorListComponent,
        data: {
            title: 'Öğretim Elemanları'
        }
    },
    {
        path: 'yonetim/soruGruplari',
        canActivate: [AuthMiddleware],
        component: QuestionGroupListComponent,
        data: {
            title: 'Soru Grupları'
        }
    },
    {
        path: 'yonetim/soruGruplari/sorular/:id',
        canActivate: [AuthMiddleware],
        component: QuestionListComponent,
        data: {
            title: 'Sorular'
        }
    },
    {
        path: 'yonetim/anketler',
        canActivate: [AuthMiddleware],
        component: SurveyFormListComponent,
        data: {
            title: 'Anketler'
        }
    },
    {
        path: 'yonetim/anketler/kodlar/:id',
        canActivate: [AuthMiddleware],
        component: SurveyFormCodeListComponent,
        data: {
            title: 'Anket Kodları'
        }
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

export const routing = RouterModule.forRoot(appRoutes);
