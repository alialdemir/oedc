import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyFormCodeService, SubscribeService } from '../../../shared/services/index';
import { IColumn, SurveyFormCode } from '../../../shared/models/index';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './surveyFormCode.list.component.html',
})

export class SurveyFormCodeListComponent implements OnInit, OnDestroy {

  title = 'Anket Kodları';

  isChoose = true;

  columns: IColumn[] = [
    { columnDef: 'instructor', header: 'Öğretim Elemanı', type: 'column', cell: (element: any) => `${element.instructorId.fullname}` },
    { columnDef: 'department', header: 'Program', type: 'column', cell: (element: any) => `${element.lessonId.department.name}` },
    { columnDef: 'lesson', header: 'Ders', type: 'column', cell: (element: any) => `${element.lessonId.name}` },
    { columnDef: 'branch', header: 'Şube', type: 'column', cell: (element: any) => `${element.branch}` },
  ];

  sub: Subscription;

  constructor(
    public surveyFormCodeService: SurveyFormCodeService,
    private subscribeService: SubscribeService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.sub = this.subscribeService.Subscribe('datatablecheck', data => this.isShow(data));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isShow(row) {
    row.isShow = !row.isShow;
    this.surveyFormCodeService
      .Update(row)
      .subscribe(isSuccess => {
        this.snackBar.open(isSuccess.message, '', { duration: 3000, });
        this.subscribeService.Publish('dataupdate', row);
      });
  }
}
