import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelBase } from '../models/index';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { SubscribeService } from '../services/index';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'TableCheckComponent',
    template: `
    <mat-checkbox
        (change)="$event ? masterToggle() : null"
        [checked]="selection.hasValue() && isAllSelected() || row.isShow"
        [indeterminate]="selection.hasValue() && !isAllSelected()"></mat-checkbox>`,
})

export class TableCheckComponent {

    selection = new SelectionModel<ModelBase>(true, []);

    @Input()
    dataSource = new MatTableDataSource<ModelBase>();

    @Input()
    row: any;

    constructor(private subscribeService: SubscribeService) { }

    isAllSelected() {

        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        const isSelected = numSelected === numRows;
        return isSelected;
    }

    masterToggle() {
        this.subscribeService.Publish('datatablecheck', this.row);
        this.isAllSelected();
    }
}
