import { Component, Inject, OnInit } from '@angular/core';
import {Item} from '../../../shared/item';
import {ItemsService} from '../../../shared/items.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {
  data: Item = new Item({});
  error: any;

  constructor(@Inject(MAT_DIALOG_DATA) public md_data: Item,
              public itemService: ItemsService,
              public dialogRef: MatDialogRef<ItemDialogComponent>) {
    try {
        this.itemService.getItemList();
    } catch (error) {
      this.error = error;
    }
  }

  ngOnInit() {
  }

  saveData(form) {

    if (form.valid) {

      this.error = false;
      this.data.$key = form.value.$key ? form.value.$key : null;
      this.data.name = form.value.name ? form.value.name : null;
      this.data.id = form.value.id ? form.value.id : null;
      this.data.amount = form.value.amount ? form.value.amount : 0;
      this.data.cost = form.value.cost ? form.value.cost : 0;
      this.data.sell = form.value.sell ? form.value.sell : 0;

      if (this.md_data) {

        if (_.isEqual(this.data, this.md_data)) {
          this.dialogRef.close(false);
        } else {
          this.itemService.updateData(this.data).then(() => {
            this.dialogRef.close(true);
          }).catch(err => {
            this.error = err.message;
          });
        }
      } else {
        this.itemService.addData(this.data).then(() => {
          this.dialogRef.close(true);
        }).catch(err => {
          this.error = err.message;
        });
      }
    }
  }

}
